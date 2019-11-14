INSERT INTO users (name, email, password) 
VALUES ('Harofina Crenklitz', 'hc@arold.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Jessothy Smalnk', 'jessothy@getoutofhere.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Samanthissa Parritolaski', 'samanamas@what.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')
;

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Deep Puddle', 'description', 'https://images.pexels.com/photos/2217264/pexels-photo-2217264.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 'https://images.pexels.com/photos/2531597/pexels-photo-2531597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 13, 7, 0, 2, 'Canada', '1 Main St', 'Moosejaw', 'Saskatchewan', 'S9R 5G4', true),
(3, 'Small Crevice In the Sidewalk', 'description', 'https://images.pexels.com/photos/2004166/pexels-photo-2004166.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 'https://images.pexels.com/photos/2004166/pexels-photo-2004166.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 1200, 2, 1, 7, 'Monaco', '45 South Wall St', 'Monaco', 'MC', '98000', true),
(2, 'A Pile of Leaves', 'description', 'https://images.pexels.com/photos/1774722/pexels-photo-1774722.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 'https://images.pexels.com/photos/1651165/pexels-photo-1651165.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 325, 0, 1, 2, 'Cyprus', '412 Agiou Kendea', 'Marisso Court', 'Paphos', '8046', true)
;

INSERT INTO rates (start_date, end_date, cost_per_night, property_id)
VALUES ('2019-01-21', '2019-03-29', 23, 1),
('2019-09-13', '2020-01-02', 78, 1),
('2019-12-23', '2020-01-05', 1700, 2),
('2019-12-30', '2020-01-02', 29000, 3),
('2020-01-03', '2020-12-22', 29, 3)
;

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2019-02-01', '2019-03-22', 1, 3),
('2019-09-06', '2019-12-15', 1, 2),
('2019-12-24', '2019-12-29', 2, 1),
('2019-12-28', '2020-01-02', 3, 2)
;

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 1, 1, 5, 'message'),
(2, 1, 2, 1, 'message'),
(1, 2, 3, 4, 'message'),
(2, 3, 4, 3, 'message')
;

INSERT INTO guest_reviews (guest_id, owner_id, reservation_id, rating, message)
VALUES (3, 1, 1, 2, 'message'),
(2, 1, 2, 5, 'message'),
(1, 3, 3, 4, 'message')
;