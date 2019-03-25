CREATE TABLE "to-do-list"
(
    -- This tells the database to automatically generate keys for us
    "id"serial primary key not null,
    -- varchar - variable (length) characters better for storage space
    "task" varchar(250) not null,
    -- Not null makes the value required
    "completed" boolean not null
    
);

INSERT INTO "to-do-list" ("task", "completed") VALUES ('Pick up prescription', 'FALSE');

INSERT INTO "to-do-list" ("task", "completed") VALUES ('Wash car', 'FALSE');

INSERT INTO "to-do-list" ("task", "completed") VALUES ('Do laundry', 'FALSE');

INSERT INTO "to-do-list" ("task", "completed") VALUES ('File taxes', 'FALSE');

INSERT INTO "to-do-list" ("task", "completed") VALUES ('Pay electricity bill', 'TRUE');