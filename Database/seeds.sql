use employees;

INSERT INTO department
    (name)
VALUES
    ('Architecture'),
    ('Engineering'),
    ('Finance'),
    ('HR');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Marketing Lead', 100000, 1),
    ('Architect I', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Principle Architect', 250000, 4),
    ('HR Manager', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Eden', 'Yiglletu', 1, NULL),
    ('Martha', 'Anderson', 2, 1),
    ('Betty', 'Smith', 3, NULL),
    ('Samuel', 'Black', 4, 3),
    ('Teddy', 'White', 5, NULL),
    ('Theo', 'Brown', 6, 5),
    ('Mimi', 'Jason', 7, NULL),
    ('Lily', 'William', 8, 7);
