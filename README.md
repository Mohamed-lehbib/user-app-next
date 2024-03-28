# Next & Supabase

## Generating the TypeScript File from Supabase CLI

1. I have installed the supabase cli on my machine using **HomeBrew**

```
brew install supabase/tap/supabase
```

2. Then i have upgraded it using this command

```
brew upgrade supabase
```

3. Then I have logged in my supabase account using this command

```
supabase login
```

4. Then I have initialized supabase in my project

```
supabase init
```

5. Then I have linked this project to the supabase project in the cloud

```
supabase link --project-ref project-reference database-password
```

replace `project-reference` with the project reference u can find it in the url of the project in the Browser and `database-password` it's the password that i have gave to the database when u have created it if u don't remenber it u can change it in the project **settings** under the **Database** reset password

6. Finally, I generated a typescript file with this command

```
supabase gen types typescript --linked > src/data/types/supabase.d.ts
```
