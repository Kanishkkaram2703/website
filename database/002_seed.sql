-- Seed data for development
INSERT INTO leads (name, phone, email, city, service_needed, load_weight, lift_date, message)
VALUES
  ('Rajesh Kumar', '+91-9876543210', 'rajesh@example.com', 'Mumbai', 'Mobile Crane Rental', '25 ton', '2026-04-15', 'Need a crane for construction site in Andheri.'),
  ('Priya Sharma', '+91-9123456780', 'priya@example.com', 'Pune', 'Heavy Lifting', '50 ton', '2026-04-20', 'Factory equipment relocation project.'),
  ('Mohammed Ali', '+91-8765432190', NULL, 'Delhi', 'Machinery Shifting', '15 ton', '2026-05-01', 'Industrial machinery shifting from warehouse.');
