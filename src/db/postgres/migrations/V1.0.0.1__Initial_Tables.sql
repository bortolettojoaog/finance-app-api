--# Create the update_updated_at_column function

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--# Create the users table

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE users IS 'Table to store users';

COMMENT ON COLUMN users.id IS 'Unique identifier for the user';
COMMENT ON COLUMN users.first_name IS 'First name of the user';
COMMENT ON COLUMN users.last_name IS 'Last name of the user';
COMMENT ON COLUMN users.email IS 'Email of the user';
COMMENT ON COLUMN users.created_at IS 'Timestamp when the user was created';
COMMENT ON COLUMN users.updated_at IS 'Timestamp when the user was last updated';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

--# Create transactions type

CREATE TYPE transaction_type AS ENUM ('EARNING', 'EXPENSE', 'INVESTMENT');

COMMENT ON TYPE transaction_type IS 'Type of transaction';

--# Create the transactions table

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  type transaction_type NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE transactions IS 'Table to store transactions';

COMMENT ON COLUMN transactions.id IS 'Unique identifier for the transaction';
COMMENT ON COLUMN transactions.user_id IS 'User who made the transaction';
COMMENT ON COLUMN transactions.name IS 'Name of the transaction';
COMMENT ON COLUMN transactions.date IS 'Date of the transaction';
COMMENT ON COLUMN transactions.amount IS 'Amount of the transaction';
COMMENT ON COLUMN transactions.type IS 'Type of the transaction';
COMMENT ON COLUMN transactions.created_at IS 'Timestamp when the transaction was created';
COMMENT ON COLUMN transactions.updated_at IS 'Timestamp when the transaction was last updated';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();