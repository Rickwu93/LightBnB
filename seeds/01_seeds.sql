INSERT INTO users (name, email, password)
VALUES ('Will Smith', 'Will@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Chris Rock', 'Chris@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Jada Smith', 'Jada@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Oscars', 'description', 'photo', 'photo', 3023, 3, 4, 5, 'Canada', '4th street', 'Calgary', 'Alberta', 'T3A 5T1');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2022-04-25', '2022-04-30'),
(2, 1, '2020-01-07', '2020-02-20'),
(3, 1, '2021-08-10', '2021-08-14');


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 5, 'My wife was insulted!');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 1, 2, 1, 'I got slapped!');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 1, 3, 2, 'I got insulted!');
