import {
  pgTable,
  text,
  serial,
  timestamp,
  varchar,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum("user_system_enum", ["user", "system"]);

/**
 * Column Details
id:
The serial data type is used for auto-incrementing primary key values.

pdfName:
Represents the name of the PDF file uploaded by the user.
The text type allows for storing variable-length strings.
This field is mandatory (using notNull()).

pdfUrl:
A text field storing the URL to the PDF file in AWS S3.
This URL is generated after the PDF is uploaded and is used to access the file.
It is a required field.

createdAt:
The timestamp for when the chat session is created.
The defaultNow() method ensures the current timestamp is saved by default.
This field is also required.

userId:
A unique identifier for the user (could be an email, UUID, or any string-based identifier).
The varchar type is used with a length constraint of 250 characters.
Required field.

fileKey:
The file key is a unique identifier used by AWS S3 to manage and retrieve the file.
It’s important for accessing the PDF in the AWS S3 bucket.
 */
export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: varchar("user_id", { length: 250 }).notNull(),
  fileKey: text("file_key").notNull(),
});

/**
id:
The serial data type is used for an auto-incrementing primary key.
Each message is uniquely identified by this column.

chatId:
This is a foreign key linking the message to a specific chat session in the chats table.
The references() method ensures that this field relates to the id column of the chats table.
The field is required (notNull()), meaning each message must be associated with an existing chat session.

content:
This field stores the actual text of the message.
It uses the text data type, allowing for variable-length strings.
It is a required field (notNull()).

createdAt:
This column captures when the message was created and sent.
It defaults to the current timestamp using the defaultNow() method.
The field is mandatory (notNull()).

role:
The role field determines the sender's role, such as whether the message was sent by the user or the system.
This field uses an enum defined as userSystemEnum and ensures only predefined roles can be assigned.
It is a required field (notNull()).
 */
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .references(() => chats.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  role: userSystemEnum("role").notNull(),
});
