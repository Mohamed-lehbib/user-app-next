import { User } from "@/data/types/user";
import { uploadUserImage } from "../upload-user-image/uploadUserImage";
import { supabase, supabaseService } from "@/api/config/supabase";

export async function updateUser(
  user: User,
  addedFiles: File[],
  deletedFiles: { file_id: string; file_name: string }[],
  image?: File
): Promise<void> {
  try {
    console.log(image);
    // Extract user details
    const { id, name, email, password, role } = user;

    // Update user details
    const { data: userData, error: userError } = await supabase
      .from("users")
      .update({ name, email, password, role })
      .eq("id", id);

    if (userError) {
      throw userError;
    }

    console.log("User details updated successfully:", userData);

    // Update user's image if a new image is selected
    if (image) {
      // Check if user already has an image
      if (!user.image_id) {
        // Upload the new image and get the UUID
        const imageUUID = await uploadUserImage(image);
        // Update the user with the new image UUID
        const { data: updateUserData, error: updateError } = await supabase
          .from("users")
          .update({ image_id: imageUUID })
          .eq("id", id);

        if (updateError) {
          throw updateError;
        }

        console.log("User image updated successfully:", updateUserData);
      } else {
        // Replace the existing image in storage with the new image
        const fileName = user.image_name;
        console.log(fileName);
        if (fileName) {
          const { data: updateData, error: updateError } =
            await supabaseService.storage
              .from("profil_image")
              .update(fileName, image);
          console.log("-----------------------------failed here");

          if (updateError) {
            throw updateError;
          }

          console.log("User image updated successfully:", updateData);
        }
      }
    } else {
      const image_name = user.image_name;
      if (image_name) {
        try {
          const { data: deleteData, error: deleteError } =
            await supabase.storage
              .from("profile_image") // Corrected bucket name to "profile_image"
              .remove([image_name]);

          if (deleteError) {
            throw deleteError; // Throws an error to be caught by the catch block
          }

          // If the deletion is successful, proceed to update the user's image_id to null
          const { data: updateUserData, error: updateError } = await supabase
            .from("users")
            .update({ image_id: "642aac8a-e89d-4164-a9d3-6857e1d16c38" }) // Setting image_id to null
            .eq("id", user.id); // Assuming `user.id` holds the user's ID

          if (updateError) {
            throw updateError; // Throws an error if updating the user fails
          }

          // Handle added files
          let addedFileUUIDs: string[] = [];
          if (addedFiles.length > 0) {
            for (const file of addedFiles) {
              const fileUUID = await uploadUserImage(file);
              // Assuming uploadUserImage returns a UUID string or undefined
              if (fileUUID) {
                addedFileUUIDs.push(fileUUID);
              }
            }
            if (addedFileUUIDs.length > 0 && user.files) {
              // Here, you only need to perform a type assertion if TypeScript
              // requires the strings to be in a specific UUID format.
              // Otherwise, this might not be necessary.
              user.files = [
                ...user.files,
                ...(addedFileUUIDs as `${string}-${string}-${string}-${string}-${string}`[]),
              ];
            }
          }

          // Handle deleted files
          if (deletedFiles.length > 0) {
            const deletedFilesNames = deletedFiles.map(
              (file) => file.file_name
            );
            const deletedFilesIds = deletedFiles.map((file) => file.file_id);
            const { data: deleteData, error: deleteError } =
              await supabase.storage.from("userFile").remove(deletedFilesNames);

            if (deleteError) throw deleteError;
            console.log("Files deleted successfully", deleteData);

            // Now, remove the deleted file references from user.files
            // Ensure that user.files is not undefined and is an array
            if (user.files && Array.isArray(user.files)) {
              // Filter out the IDs of the files that have been deleted
              const updatedFileIds = user.files.filter(
                (fileId) => !deletedFilesIds.includes(fileId)
              );

              // Assuming there's a way to update the user's record with the new set of file IDs
              // For example, if you're storing these IDs in a database
              const { data: updatedUserData, error: updateUserError } =
                await supabase
                  .from("users")
                  .update({ files: updatedFileIds })
                  .eq("id", user.id);

              if (updateUserError) throw updateUserError;
              console.log("Updated user's files successfully", updatedUserData);

              // Update the local user object as well, if necessary
              user.files = updatedFileIds;
            }
          }

          console.log(
            "Image removed and user updated successfully",
            deleteData,
            updateUserData
          );
        } catch (e: any) {
          console.error(
            "Error with deleting image from storage or updating user:",
            e.message
          );
        }
      }
    }

    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user:", (error as Error).message);
    throw error;
  }
}
