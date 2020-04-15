USE employee_DB;

INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Marketing");
INSERT into department (name) VALUES ("Finance");

INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales person", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales Lead", 70000, 1);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("Engineer", 900000, 2);
INSERT into role (title, salary, department_id) VALUES ("Marketing Asst", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Marketing Specialist", 60000, 3);
INSERT into role (title, salary, department_id) VALUES ("Promotions", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Operations", 80000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Patterson", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bill", "Gates", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Donald", "Chamberlain", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Raymond", "Boyce", 2, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("P.T.", "Barnum.", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Henry", "Ford", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Walt", "Disney", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Steve", "Jobs", 4, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bruce", "Banner", 5, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bruce", "Wayne", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Clark", "Kent", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Hank", "Pym", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Peter", "Parker", 8, 5);
