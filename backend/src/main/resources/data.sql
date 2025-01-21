-- Insert users with various roles and states
INSERT INTO users (id, email, password, name, created_at, verified, online, role)
VALUES
    (1, 'john.doe@example.com', 'hashedpassword123', 'John Doe', NOW() - INTERVAL '30 days', true, true, 'ADMIN'),
    (2, 'jane.smith@example.com', 'hashedpassword456', 'Jane Smith', NOW() - INTERVAL '25 days', true, false, 'USER'),
    (3, 'alice.brown@example.com', 'hashedpassword789', 'Alice Brown', NOW() - INTERVAL '20 days', true, false, 'USER'),
    (4, 'bob.wilson@example.com', 'hashedpassword101', 'Bob Wilson', NOW() - INTERVAL '15 days', true, true, 'MANAGER'),
    (5, 'carol.white@example.com', 'hashedpassword102', 'Carol White', NOW() - INTERVAL '10 days', true, true, 'USER'),
    (6, 'david.black@example.com', 'hashedpassword103', 'David Black', NOW() - INTERVAL '5 days', false, false, 'USER'),
    (7, 'emma.green@example.com', 'hashedpassword104', 'Emma Green', NOW() - INTERVAL '3 days', true, true, 'USER'),
    (8, 'frank.miller@example.com', 'hashedpassword105', 'Frank Miller', NOW() - INTERVAL '2 days', false, false, 'USER'),
    (9, 'grace.taylor@example.com', 'hashedpassword106', 'Grace Taylor', NOW(), true, true, 'MANAGER'),
    (10, 'henry.adams@example.com', 'hashedpassword107', 'Henry Adams', NOW(), false, false, 'USER');

-- Insert user settings for all users
INSERT INTO user_settings (id, user_id, email_digest, task_reminders)
VALUES
    (1, 1, true, true),
    (2, 2, true, false),
    (3, 3, false, true),
    (4, 4, true, true),
    (5, 5, false, false),
    (6, 6, true, true),
    (7, 7, false, true),
    (8, 8, true, false),
    (9, 9, true, true),
    (10, 10, false, false);

-- Insert various events
INSERT INTO events (id, title, description, created_at, location, created_by)
VALUES
    (1, 'Annual Strategy Meeting', 'Yearly planning and strategy discussion.', NOW() + INTERVAL '30 days', 'Conference Room A', 1),
    (2, 'Summer Hackathon 2025', 'Annual company-wide hackathon event.', NOW() + INTERVAL '60 days', 'Main Hall', 4),
    (3, 'Team Building Workshop', 'Interactive workshop for team bonding.', NOW() + INTERVAL '15 days', 'Recreation Center', 9),
    (4, 'Product Launch', 'Launch event for new product line.', NOW() + INTERVAL '45 days', 'Exhibition Hall', 1),
    (5, 'Tech Talk Series', 'Weekly technical presentation series.', NOW() + INTERVAL '7 days', 'Auditorium', 4),
    (6, 'Code Review Sprint', 'Intensive code review and cleanup sprint.', NOW() + INTERVAL '21 days', 'Development Floor', 9),
    (7, 'Client Appreciation Day', 'Annual client appreciation event.', NOW() + INTERVAL '90 days', 'Garden Plaza', 1),
    (8, 'Security Training', 'Mandatory security awareness training.', NOW() + INTERVAL '10 days', 'Training Room B', 4);

-- Insert event participants (user_event relationships)
INSERT INTO user_event (event_id, user_id)
VALUES
    -- Annual Strategy Meeting participants
    (1, 1), (1, 2), (1, 4), (1, 9),
    -- Hackathon participants
    (2, 1), (2, 2), (2, 3), (2, 5), (2, 6), (2, 7), (2, 8),
    -- Team Building participants
    (3, 2), (3, 3), (3, 5), (3, 6), (3, 7), (3, 8), (3, 10),
    -- Product Launch participants
    (4, 1), (4, 4), (4, 9), (4, 2), (4, 5),
    -- Tech Talk participants
    (5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10),
    -- Code Review Sprint participants
    (6, 2), (6, 3), (6, 5), (6, 7), (6, 8),
    -- Client Appreciation Day participants
    (7, 1), (7, 4), (7, 9), (7, 2), (7, 5), (7, 7),
    -- Security Training participants
    (8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 6), (8, 7), (8, 8), (8, 9), (8, 10);

-- Insert tasks for various events
INSERT INTO tasks (id, title, description, status, assigned_to, event_id)
VALUES
    -- Annual Strategy Meeting tasks
    (1, 'Prepare Financial Reports', 'Compile and analyze yearly financial data.', 'IN_PROGRESS', 1, 1),
    (2, 'Create Presentation Deck', 'Design main presentation slides.', 'PENDING', 2, 1),
    (3, 'Book Catering Service', 'Arrange lunch and refreshments.', 'COMPLETED', 4, 1),

    -- Hackathon tasks
    (4, 'Setup Development Environment', 'Prepare workstations and servers.', 'PENDING', 3, 2),
    (5, 'Organize Teams', 'Create balanced teams for the event.', 'IN_PROGRESS', 4, 2),
    (6, 'Prepare Prize Categories', 'Define judging criteria and prizes.', 'COMPLETED', 9, 2),

    -- Team Building tasks
    (7, 'Design Activities', 'Plan team building exercises.', 'IN_PROGRESS', 9, 3),
    (8, 'Arrange Equipment', 'Gather necessary materials and equipment.', 'PENDING', 5, 3),

    -- Product Launch tasks
    (9, 'Prepare Demo Units', 'Setup product demonstrations.', 'PENDING', 1, 4),
    (10, 'Create Marketing Materials', 'Design brochures and presentations.', 'IN_PROGRESS', 2, 4),

    -- Additional tasks for various events
    (11, 'Coordinate With Vendors', 'Manage external vendor relationships.', 'PENDING', 4, 7),
    (12, 'Setup Video Recording', 'Prepare recording equipment for documentation.', 'IN_PROGRESS', 7, 5),
    (13, 'Create Training Materials', 'Develop security training documentation.', 'COMPLETED', 9, 8),
    (14, 'Review Code Repositories', 'Identify areas for code review focus.', 'IN_PROGRESS', 3, 6),
    (15, 'Manage Registration', 'Handle participant registration process.', 'PENDING', 5, 2);

-- Insert task comments
INSERT INTO task_comments (id, content, timestamp, sender_id, task_id)
VALUES
    (1, 'First draft of financial reports ready for review.', NOW() - INTERVAL '2 days', 1, 1),
    (2, 'Added new section on market analysis.', NOW() - INTERVAL '1 day', 2, 1),
    (3, 'Catering service confirmed for 50 people.', NOW(), 4, 3),
    (4, 'Development environments will be Docker-based.', NOW() - INTERVAL '3 days', 3, 4),
    (5, 'Teams will be assigned based on skill diversity.', NOW() - INTERVAL '2 days', 4, 5),
    (6, 'Prize categories approved by management.', NOW() - INTERVAL '1 day', 9, 6),
    (7, 'Activities will include problem-solving challenges.', NOW(), 9, 7),
    (8, 'Need additional monitors for demo stations.', NOW() - INTERVAL '4 days', 1, 9),
    (9, 'Marketing materials draft sent for approval.', NOW() - INTERVAL '2 days', 2, 10),
    (10, 'Vendor contracts under legal review.', NOW() - INTERVAL '1 day', 4, 11),
    (11, 'Recording equipment tested and working.', NOW(), 7, 12),
    (12, 'Training materials ready for distribution.', NOW() - INTERVAL '3 days', 9, 13),
    (13, 'Initial repository scan completed.', NOW() - INTERVAL '2 days', 3, 14),
    (14, 'Registration system configured and tested.', NOW() - INTERVAL '1 day', 5, 15),
    (15, 'Updated equipment requirements list.', NOW(), 5, 8);

-- Insert messages
INSERT INTO messages (id, content, timestamp, sender_id)
VALUES
    (1, 'Team, please review the updated strategy document.', NOW() - INTERVAL '3 days', 1),
    (2, 'Looking forward to the hackathon next month!', NOW() - INTERVAL '2 days', 2),
    (3, 'Can someone help test the demo environment?', NOW() - INTERVAL '1 day', 3),
    (4, 'All managers: Please submit your team availability.', NOW() - INTERVAL '12 hours', 4),
    (5, 'Registration for the tech talk is now open.', NOW() - INTERVAL '6 hours', 5),
    (6, 'Having issues with the development environment setup.', NOW() - INTERVAL '5 hours', 6),
    (7, 'Workshop materials have been uploaded to the shared drive.', NOW() - INTERVAL '4 hours', 7),
    (8, 'Will miss the morning session due to client meeting.', NOW() - INTERVAL '3 hours', 8),
    (9, 'Security training attendance is mandatory for all team members.', NOW() - INTERVAL '2 hours', 9),
    (10, 'Updated the project timeline on the shared calendar.', NOW() - INTERVAL '1 hour', 10),
    (11, 'Dont forget to submit your hackathon project proposals.', NOW() - INTERVAL '30 minutes', 1),
    (12, 'Client presentation rehearsal at 2 PM today.', NOW() - INTERVAL '15 minutes', 4),
    (13, 'All systems are go for the product launch!', NOW() - INTERVAL '10 minutes', 9),
    (14, 'Need volunteers for the registration desk.', NOW() - INTERVAL '5 minutes', 2),
    (15, 'Remember to update your tasks in the system.', NOW(), 1);