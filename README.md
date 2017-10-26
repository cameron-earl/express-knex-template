# Full-Stack Project Template

This is a template for a full-stack project using:
- express (routing)
- ejs (templates)
- knex (database stuff)
- postgres (actual database)
- express-session (cookies)
- bcrypt (password encryption)
- plus a couple others to make these ones work.

## Directions
1. Open your project directory
2. Copy the files and directories in this template into your project directory (except this readme)
3. command line: `npm install`
4. In knexfile.js, change database to something appropriate
5. If the database doesn't already exist: `createdb databasename`
6. Create your tables:
  - knex migrate:make tablename
  - knex seed:make 0_tablename
7. Fill in migration/seed files. Example:
  ```js
  exports.up = (knex, Promise) => {  
    return knex.schema.createTable('users', table => {
      table.increments();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.integer('group_id')
       .notNullable()
       .references('id')
       .inTable('groups')
       .onDelete('CASCADE')
       .index();
      table.timestamps(true, true);
    });
  };

  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
  };
  ```
8. Get your database up.
  ```sh
  knex migrate:rollback
  knex migrate:latest
  knex seed:run
  ```
9. Get your server running with `nodemon` and test to make sure localhost:8000 is working!
10. Don't forget to `git init` at some point!

## General Usage Notes
- If you have multiple levels of authorization in  your config/routes.js, you'll need to update the lowest-level authorization function to account for that. Here's an example:
  ```js
  function userAuth(req, res, next) {
    if(req.session.user || req.session.airline || req.session.admin){
      next();
    } else if (req.originalUrl.startsWith('/admin')){
      res.redirect("/admin/login");
    } else if (req.originalUrl.startsWith('/airlines')) {
      res.redirect("/airlines.login");
    } else {
      res.redirect("/login")
    }
  }
  ```
- If you're saving session variables and then redirecting, you'll want to put the redirect inside a session.save callback, like such:
  ```js
  req.session.save(err=>{ /* here */})
  ```
  Otherwise the session might not save before the next page is loaded. I also included an example inside the `main.index` function, though it's likely unnecessary.
- Any files named "filler" should probably be deleted.
