-- Shivoham Crane Services - Database Schema
-- PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads / Quote Requests
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  service_needed VARCHAR(255) NOT NULL,
  load_weight VARCHAR(100),
  lift_date DATE,
  message TEXT,
  file_url VARCHAR(500),
  source VARCHAR(50) DEFAULT 'website',
  ip_address VARCHAR(45),
  user_agent TEXT,
  is_spam BOOLEAN DEFAULT FALSE,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
  id SERIAL PRIMARY KEY,
  ip_address VARCHAR(45) NOT NULL,
  endpoint VARCHAR(255) NOT NULL,
  request_count INT DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ip_address, endpoint)
);

-- Indexes for performance
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_is_spam ON leads(is_spam);
CREATE INDEX idx_leads_read ON leads(read);
CREATE INDEX idx_rate_limits_ip ON rate_limits(ip_address, endpoint);
