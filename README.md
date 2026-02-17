# Uniti Tracking API

A NestJS backend service for collecting and managing user tracking data from the Uniti Android app.

## Features

### 1. SMS Transaction Scraping

- Parse mobile money SMS messages from providers
- Store transaction details (amount, sender, date, description)
- Support for batch uploads from the mobile app
- Integration-ready for third-party SMS parsing services (Pngme, Stitch, Okra)

### 2. Location Tracking

- Collect periodic location data when app is in foreground
- Store latitude, longitude, accuracy, and timestamp
- Batch upload support for efficient data transmission
- Query by user and date range

### 3. Phone Usage Metadata

- **Call Logs**: Track call timestamp, duration, direction (incoming/outgoing/missed), and hashed contact
- **SMS Metadata**: Track SMS timestamp, direction, hashed sender/recipient, and message length
- Privacy-focused: contacts are hashed for anonymity
- Batch upload support for both call and SMS data

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure your database:

```bash
cp .env.example .env
```

Update the following variables:

- `DB_HOST`: PostgreSQL host
- `DB_PORT`: PostgreSQL port
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Endpoints

### SMS Transactions

- `POST /sms-transactions` - Create single transaction
- `POST /sms-transactions/batch` - Batch upload transactions
- `GET /sms-transactions` - Get all transactions (optional ?userId filter)
- `GET /sms-transactions/:id` - Get transaction by ID
- `GET /sms-transactions/user/:userId` - Get user transactions (optional ?limit)

### Locations

- `POST /locations` - Create single location
- `POST /locations/batch` - Batch upload locations
- `GET /locations` - Get all locations (optional ?userId filter)
- `GET /locations/:id` - Get location by ID
- `GET /locations/user/:userId` - Get user locations (optional ?limit)
- `GET /locations/user/:userId/range` - Get locations by date range (?startDate, ?endDate)

### Phone Usage

- `POST /phone-usage/calls` - Create single call log
- `POST /phone-usage/sms` - Create single SMS usage log
- `POST /phone-usage/batch` - Batch upload call and SMS logs
- `GET /phone-usage/calls` - Get all call logs (optional ?userId filter)
- `GET /phone-usage/calls/user/:userId` - Get user call logs (optional ?limit)
- `GET /phone-usage/sms` - Get all SMS usage logs (optional ?userId filter)
- `GET /phone-usage/sms/user/:userId` - Get user SMS logs (optional ?limit)

## Database Schema

### SMS Transactions

- User ID, Transaction ID, Sender, Amount, Currency
- Transaction Date, Description, Raw Message
- Status (PENDING, PROCESSED, FAILED)

### Locations

- User ID, Latitude, Longitude, Accuracy
- Timestamp (when captured), Created At (when uploaded)

### Call Logs

- User ID, Timestamp, Duration
- Direction (INCOMING/OUTGOING/MISSED)
- Contact Hash, Type

### SMS Usage Logs

- User ID, Timestamp
- Direction (INCOMING/OUTGOING)
- Sender/Recipient Hash, Message Length

## Data Collection Notes

### SMS Scraping

The system is designed to integrate with third-party SMS parsing services like:

- **Pngme**: Purpose-built for mobile money SMS parsing
- **Stitch**: Financial data aggregation
- **Okra**: Banking and payment data

The current implementation stores parsed data. Integration with these services would happen at the mobile app level, with parsed data sent to this backend.

### Location Tracking

- Requires user permission on Android
- Foreground-only tracking (when app is open)
- Local storage on device with periodic batch uploads
- Privacy-conscious design

### Phone Usage

- Requires `READ_CALL_LOG` and `READ_SMS` permissions (restricted on Google Play)
- Contacts are hashed for privacy
- Only metadata is collected (no message content)
- May leverage third-party tools for enhanced parsing

## Production Considerations

⚠️ **Important**: Before deploying to production:

1. Set `synchronize: false` in `app.module.ts` TypeORM configuration
2. Use proper database migrations instead of auto-sync
3. Implement authentication and authorization
4. Add rate limiting for batch endpoints
5. Set up proper logging and monitoring
6. Configure CORS appropriately
7. Use environment-specific configurations
8. Implement data retention policies
9. Add encryption for sensitive data
10. Set up backup and recovery procedures

## License

Private - Uniti
