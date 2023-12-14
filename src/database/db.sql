-- Active: 1700143401531@@127.0.0.1@3307@sysfac_old
DROP DATABASE IF EXISTS sysfac;


CREATE DATABASE sysfac;


use sysfac;


-- ? USERS
DROP TABLE
  IF EXISTS USERS;


CREATE TABLE
  USERS (
    -- user data
    userId INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    type ENUM('Admin', 'SuperAdmin', 'Vendedor') NOT NULL DEFAULT 'Admin',
    state ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    -- personal data
    names VARCHAR(50),
    lastnames VARCHAR(50),
    email VARCHAR(40),
    phone VARCHAR(10),
    -- date
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    -- definitions
    PRIMARY KEY(userId)
  );


-- ? CATEGORIES
DROP TABLE
  IF EXISTS CATEGORIES;


CREATE TABLE
  CATEGORIES (
    categoryId INT NOT NULL AUTO_INCREMENT,
    -- category data
    slug VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL UNIQUE,
    image VARCHAR(1000),
    -- date
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    -- definitions
    PRIMARY KEY(categoryId)
  );


-- ? PRODUCTS
DROP TABLE
  IF EXISTS PRODUCTS;


CREATE TABLE
  PRODUCTS (
    productId INT NOT NULL AUTO_INCREMENT,
    -- product data
    name VARCHAR(500) NOT NULL UNIQUE,
    image VARCHAR(1000),
    inventaryMin SMALLINT NOT NULL,
    priceSale DECIMAL(6, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    saleFor ENUM('Cantidad', 'Unidad/NS') NOT NULL DEFAULT 'Cantidad',
    isActive BIT NOT NULL DEFAULT 1,
    -- relations
    categoryId INT NOT NULL,
    -- date
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    -- definitions
    PRIMARY KEY(productId),
    FOREIGN KEY(categoryId) REFERENCES categories(categoryId)
  );


-- ? LOCATIONS
DROP TABLE
  IF EXISTS LOCATIONS;


CREATE TABLE
  LOCATIONS (
    localId INT NOT NULL AUTO_INCREMENT,
    -- locaction data
    name VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(100) NOT NULL,
    type ENUM('Almacén', 'Tienda') DEFAULT 'Tienda',
    canStoreMore BIT DEFAULT 1,
    -- date
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    -- definitions
    PRIMARY KEY(localId)
  );


-- ? SUPPLIERS
DROP TABLE
  IF EXISTS SUPPLIERS;


CREATE TABLE
  SUPPLIERS (
    supplierId INT NOT NULL AUTO_INCREMENT,
    -- supplier data
    ruc VARCHAR(13) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(10),
    -- date
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    -- definitions
    PRIMARY KEY(supplierId)
  );


-- ? CLIENTS
DROP TABLE
  IF EXISTS CLIENTS;


CREATE TABLE
  CLIENTS (
    clientId INT NOT NULL AUTO_INCREMENT,
    -- client data
    ruc VARCHAR(13),
    dni VARCHAR(8),
    names VARCHAR(100) NOT NULL,
    lastnames VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    phone VARCHAR(10),
    -- date
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    -- definitions
    PRIMARY KEY(clientId)
  );


-- ? INVENTARY
DROP TABLE
  IF EXISTS INVENTARY;


CREATE TABLE
  INVENTARY (
    unitId INT NOT NULL AUTO_INCREMENT,
    -- item data
    serialNumber VARCHAR(100) NOT NULL UNIQUE,
    state ENUM('En stock', 'Vendido', 'Dañado') NOT NULL DEFAULT 'En stock',
    -- relations
    productId INT NOT NULL,
    localId INT NOT NULL,
    -- date
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    -- definitions
    PRIMARY KEY(unitId),
    FOREIGN KEY(productId) REFERENCES PRODUCTS(productId),
    FOREIGN KEY(localId) REFERENCES LOCATIONS(localId)
  );


-- ? TRANSACTIONS
DROP TABLE
  IF EXISTS TRANSACTIONS;


CREATE TABLE
  TRANSACTIONS (
    transactionId INT NOT NULL AUTO_INCREMENT,
    -- transaction data
    operationType ENUM('Compra', 'Venta') NOT NULL DEFAULT 'Venta',
    proofType ENUM('Factura', 'Boleta de venta'),
    proofCode VARCHAR(50) UNIQUE,
    totalImport DECIMAL(7, 2),
    discount DECIMAL(7, 2),
    totalPay DECIMAL(7, 2) NOT NULL DEFAULT 0.00,
    comments VARCHAR(1000),
    -- relations
    supplierId INT,
    clientId INT,
    userId INT NOT NULL,
    -- date
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    -- definitions
    PRIMARY KEY(transactionId),
    FOREIGN KEY(supplierId) REFERENCES SUPPLIERS(supplierId),
    FOREIGN KEY(clientId) REFERENCES CLIENTS(clientId),
    FOREIGN KEY(userId) REFERENCES USERS(userId)
  );


-- ? OPERATIONS
DROP TABLE
  IF EXISTS OPERATIONS;


CREATE TABLE
  OPERATIONS (
    -- operation data
    operationType ENUM('Venta', 'Compra') NOT NULL,
    description VARCHAR(500) NOT NULL,
    serialNumber VARCHAR(100),
    unitCost DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
    quantity SMALLINT NOT NULL,
    importSale DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
    details VARCHAR(100),
    -- relations
    productId INT NOT NULL,
    transactionId INT NOT NULL,
    -- date
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    -- definitions
    PRIMARY KEY (operationType, serialNumber),
    FOREIGN KEY(transactionId) REFERENCES TRANSACTIONS(transactionId),
    FOREIGN KEY(productId) REFERENCES PRODUCTS(productId)
  );


-- ? SALES
-- DROP TABLE
--   IF EXISTS SALES;
-- CREATE TABLE
--   SALES (
--     saleId INT NOT NULL AUTO_INCREMENT,
--     -- sale data
--     proofType ENUM('Factura', 'Boleta de venta') NOT NULL,
--     proofCode VARCHAR(50) NOT NULL,
--     totalImport DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
--     discount DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
--     totalPay DECIMAL(6, 2) NOT NULL,
--     comments VARCHAR(1000),
--     -- relations
--     clientId INT NOT NULL,
--     userId INT NOT NULL,
--     -- date
--     createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
--     -- definitions
--     PRIMARY KEY(saleId),
--     FOREIGN KEY(clientId) REFERENCES CLIENTS(clientId),
--     FOREIGN KEY(userId) REFERENCES USERS(userId)
--   );
-- -- ? PURCHASES
-- DROP TABLE
--   IF EXISTS PURCHASES;
-- CREATE TABLE
--   PURCHASES (
--     purchaseId INT NOT NULL AUTO_INCREMENT,
--     -- purchase data
--     totalPay DECIMAL(6, 2) NOT NULL,
--     comments VARCHAR(1000),
--     -- relations
--     supplierId INT NOT NULL,
--     userId INT NOT NULL,
--     -- date
--     createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
--     -- definitions
--     PRIMARY KEY(purchaseId),
--     FOREIGN KEY(supplierId) REFERENCES SUPPLIERS(supplierId),
--     FOREIGN KEY(userId) REFERENCES USERS(userId)
--   );
-- -- ? OPERATIONS_SALE
-- DROP TABLE
--   IF EXISTS OPERATIONS_SALE;
-- CREATE TABLE
--   OPERATIONS_SALE (
--     operationId INT NOT NULL AUTO_INCREMENT,
--     -- operation data
--     description VARCHAR(500)NOT NULL,
--     serialNumber VARCHAR(100),
--     unitCost DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
--     quantity SMALLINT NOT NULL,
--     import DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
--     details VARCHAR(100),
--     -- relations
--     productId INT NOT NULL,
--     saleId INT NOT NULL,
--     -- date
--     createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
--     -- definitions
--     PRIMARY KEY(operationId),
--     FOREIGN KEY(saleId) REFERENCES SALES(saleId),
--     FOREIGN KEY(productId) REFERENCES PRODUCTS(productId)
--   );
-- -- ? OPERATIONS_PURCHASE
-- DROP TABLE
--   IF EXISTS OPERATIONS_PURCHASE;
-- CREATE TABLE
--   OPERATIONS_PURCHASE (
--     operationId INT NOT NULL AUTO_INCREMENT,
--     -- operation data
--     description VARCHAR(500)NOT NULL,
--     serialNumber VARCHAR(100),
--     unitCost DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
--     quantity SMALLINT NOT NULL,
--     import DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
--     -- relations
--     productId INT NOT NULL,
--     purchaseId INT NOT NULL,
--     -- date
--     createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
--     -- definitions
--     PRIMARY KEY(operationId),
--     FOREIGN KEY(purchaseId) REFERENCES PURCHASES(purchaseId),
--     FOREIGN KEY(productId) REFERENCES PRODUCTS(productId)
--   );