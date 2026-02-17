-- Sample data for testing the Uniti Tracking system

-- Sample SMS Transactions (Mobile Money)
INSERT INTO sms_transactions (user_id, transaction_id, sender, amount, currency, transaction_date, description, raw_message, status) VALUES
('user_001', 'ABC123XYZ', 'M-PESA', 500.00, 'KES', '2026-02-08 22:30:00', 'Sent to John Doe', 'ABC123XYZ Confirmed. Ksh500.00 sent to John Doe 0712345678 on 8/2/26 at 11:30 PM. New M-PESA balance is Ksh2,450.00.', 'PROCESSED'),
('user_001', 'DEF456UVW', 'M-PESA', 1200.00, 'KES', '2026-02-07 14:15:00', 'Received from Jane Smith', 'DEF456UVW Confirmed. You have received Ksh1,200.00 from Jane Smith 0723456789 on 7/2/26 at 2:15 PM.', 'PROCESSED'),
('user_002', 'GHI789RST', 'MTN', 50.00, 'GHS', '2026-02-08 18:45:00', 'Airtime purchase', 'You have successfully purchased GHS 50.00 airtime. Transaction ID: GHI789RST', 'PROCESSED'),
('user_001', 'JKL012OPQ', 'M-PESA', 2500.00, 'KES', '2026-02-06 09:20:00', 'Paybill payment', 'JKL012OPQ Confirmed. Ksh2,500.00 sent to KPLC on 6/2/26 at 9:20 AM.', 'PROCESSED'),
('user_003', 'MNO345LMN', 'VODAFONE', 100.00, 'GHS', '2026-02-08 12:00:00', 'Received from merchant', 'You have received GHS 100.00 from Merchant ABC. Ref: MNO345LMN', 'PENDING');

-- Sample Location Data
INSERT INTO locations (user_id, latitude, longitude, accuracy, timestamp) VALUES
-- User 1 - Nairobi, Kenya (moving around the city)
('user_001', -1.286389, 36.817223, 15.5, '2026-02-08 08:00:00'),
('user_001', -1.289567, 36.821945, 12.3, '2026-02-08 08:15:00'),
('user_001', -1.292134, 36.825678, 18.7, '2026-02-08 08:30:00'),
('user_001', -1.295421, 36.829012, 10.2, '2026-02-08 08:45:00'),
('user_001', -1.298765, 36.832345, 14.8, '2026-02-08 09:00:00'),

-- User 2 - Accra, Ghana (at work location)
('user_002', 5.603717, -0.186964, 8.5, '2026-02-08 09:00:00'),
('user_002', 5.603720, -0.186970, 7.2, '2026-02-08 09:30:00'),
('user_002', 5.603715, -0.186960, 9.1, '2026-02-08 10:00:00'),

-- User 3 - Lagos, Nigeria (commuting)
('user_003', 6.524379, 3.379206, 20.3, '2026-02-08 07:30:00'),
('user_003', 6.528945, 3.382134, 18.9, '2026-02-08 07:45:00'),
('user_003', 6.533421, 3.385678, 22.1, '2026-02-08 08:00:00');

-- Sample Call Logs
INSERT INTO call_logs (user_id, timestamp, duration, direction, contact_hash, type) VALUES
-- User 1 calls
('user_001', '2026-02-08 09:15:00', 125, 'OUTGOING', 'a3b2c1d4e5f6789012345678901234567890abcdef1234567890abcdef123456', 'answered'),
('user_001', '2026-02-08 10:30:00', 0, 'MISSED', 'b4c3d2e1f0a9876543210987654321098765fedcba0987654321fedcba098765', 'missed'),
('user_001', '2026-02-08 11:45:00', 234, 'INCOMING', 'c5d4e3f2a1b0987654321098765432109876543210fedcba9876543210fedcba', 'answered'),
('user_001', '2026-02-08 14:20:00', 67, 'OUTGOING', 'd6e5f4a3b2c1098765432109876543210987654321abcdef0123456789abcdef', 'answered'),

-- User 2 calls
('user_002', '2026-02-08 08:00:00', 456, 'INCOMING', 'e7f6a5b4c3d2109876543210987654321098765432bcdef01234567890bcdef0', 'answered'),
('user_002', '2026-02-08 12:30:00', 89, 'OUTGOING', 'f8a7b6c5d4e3210987654321098765432109876543cdef012345678901cdef01', 'answered'),
('user_002', '2026-02-08 16:45:00', 0, 'MISSED', 'a9b8c7d6e5f4321098765432109876543210987654def0123456789012def012', 'missed'),

-- User 3 calls
('user_003', '2026-02-08 07:15:00', 178, 'OUTGOING', 'b0c9d8e7f6a5432109876543210987654321098765ef01234567890123ef0123', 'answered'),
('user_003', '2026-02-08 13:00:00', 312, 'INCOMING', 'c1d0e9f8a7b6543210987654321098765432109876f012345678901234f01234', 'answered');

-- Sample SMS Usage Logs
INSERT INTO sms_usage_logs (user_id, timestamp, direction, sender_recipient_hash, message_length) VALUES
-- User 1 SMS
('user_001', '2026-02-08 08:30:00', 'OUTGOING', 'aa11bb22cc33dd44ee55ff66aa77bb88cc99dd00ee11ff22aa33bb44cc55dd66', 45),
('user_001', '2026-02-08 09:45:00', 'INCOMING', 'bb22cc33dd44ee55ff66aa77bb88cc99dd00ee11ff22aa33bb44cc55dd66ee77', 128),
('user_001', '2026-02-08 11:00:00', 'OUTGOING', 'cc33dd44ee55ff66aa77bb88cc99dd00ee11ff22aa33bb44cc55dd66ee77ff88', 67),
('user_001', '2026-02-08 13:15:00', 'INCOMING', 'dd44ee55ff66aa77bb88cc99dd00ee11ff22aa33bb44cc55dd66ee77ff88aa99', 92),
('user_001', '2026-02-08 15:30:00', 'OUTGOING', 'ee55ff66aa77bb88cc99dd00ee11ff22aa33bb44cc55dd66ee77ff88aa99bb00', 156),

-- User 2 SMS
('user_002', '2026-02-08 07:45:00', 'INCOMING', 'ff66aa77bb88cc99dd00ee11ff22aa33bb44cc55dd66ee77ff88aa99bb00cc11', 73),
('user_002', '2026-02-08 10:20:00', 'OUTGOING', 'aa77bb88cc99dd00ee11ff22aa33bb44cc55dd66ee77ff88aa99bb00cc11dd22', 41),
('user_002', '2026-02-08 14:00:00', 'INCOMING', 'bb88cc99dd00ee11ff22aa33bb44cc55dd66ee77ff88aa99bb00cc11dd22ee33', 189),

-- User 3 SMS
('user_003', '2026-02-08 08:15:00', 'OUTGOING', 'cc99dd00ee11ff22aa33bb44cc55dd66ee77ff88aa99bb00cc11dd22ee33ff44', 52),
('user_003', '2026-02-08 12:45:00', 'INCOMING', 'dd00ee11ff22aa33bb44cc55dd66ee77ff88aa99bb00cc11dd22ee33ff44aa55', 134),
('user_003', '2026-02-08 17:30:00', 'OUTGOING', 'ee11ff22aa33bb44cc55dd66ee77ff88aa99bb00cc11dd22ee33ff44aa55bb66', 98);

-- Verify data
SELECT 'SMS Transactions' as table_name, COUNT(*) as record_count FROM sms_transactions
UNION ALL
SELECT 'Locations', COUNT(*) FROM locations
UNION ALL
SELECT 'Call Logs', COUNT(*) FROM call_logs
UNION ALL
SELECT 'SMS Usage Logs', COUNT(*) FROM sms_usage_logs;
