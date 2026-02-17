-- Create database
CREATE DATABASE uniti_tracking;

-- Connect to the database
\c uniti_tracking;

-- Locations Table
CREATE TABLE locations (
    user_id VARCHAR(255) NOT NULL,
    id INTEGER NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    accuracy FLOAT,
    synced INTEGER DEFAULT 1,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, id)
);

-- Call Logs Table
CREATE TABLE call_logs (
    user_id VARCHAR(255) NOT NULL,
    id INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    direction VARCHAR(20) NOT NULL,
    status VARCHAR(50),
    duration INTEGER NOT NULL,
    contact_hash VARCHAR(255) NOT NULL,
    synced INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, id)
);

-- SMS Logs Table
CREATE TABLE sms_logs (
    user_id VARCHAR(255) NOT NULL,
    id INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    direction VARCHAR(20) NOT NULL,
    length INTEGER NOT NULL,
    contact_hash VARCHAR(255) NOT NULL,
    synced INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, id)
);

-- Create indexes for performance
CREATE INDEX idx_locations_timestamp ON locations(timestamp);
CREATE INDEX idx_call_logs_timestamp ON call_logs(timestamp);
CREATE INDEX idx_sms_logs_timestamp ON sms_logs(timestamp);
