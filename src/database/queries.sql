-- Active: 1700143401531@@127.0.0.1@3307@sysfac
USE sysfac;


-- insert users
INSERT INTO
  users(
    username,
    password,
    type,
    state,
    names,
    lastnames,
    email,
    phone
  )
VALUES
  (
    'juan',
    'juan123',
    'Admin',
    'Activo',
    'Juan',
    'Pérez',
    'juan.perez@example.com',
    '987654321'
  ),
  (
    'maria',
    'maria123',
    'SuperAdmin',
    'Activo',
    'María',
    'López',
    'maria.lopez@example.com',
    '987654322'
  ),
  (
    'pedro',
    'pedro123',
    'Vendedor',
    'Inactivo',
    'Pedro',
    'Ramírez',
    'pedro.ramirez@example.com',
    '987654323'
  ),
  (
    'ana',
    'ana123',
    'Admin',
    'Activo',
    'Ana',
    'González',
    'ana.gonzalez@example.com',
    '987654324'
  ),
  (
    'carlos',
    'carlos123',
    'SuperAdmin',
    'Activo',
    'Carlos',
    'Martínez',
    'carlos.martinez@example.com',
    '987654325'
  ),
  (
    'laura',
    'laura123',
    'Vendedor',
    'Inactivo',
    'Laura',
    'Rodríguez',
    'laura.rodriguez@example.com',
    '987654326'
  ),
  (
    'luis',
    'luis123',
    'Admin',
    'Activo',
    'Luis',
    'Fernández',
    'luis.fernandez@example.com',
    '987654327'
  ),
  (
    'isabel',
    'isabel123',
    'SuperAdmin',
    'Activo',
    'Isabel',
    'Sánchez',
    'isabel.sanchez@example.com',
    '987654328'
  ),
  (
    'miguel',
    'miguel123',
    'Vendedor',
    'Activo',
    'Miguel',
    'López',
    'miguel.lopez@example.com',
    '987654329'
  ),
  (
    'claudia',
    'claudia-gomez123',
    'Admin',
    'Activo',
    'Claudia',
    'Gómez',
    'claudia.gomez@example.com',
    '987654330'
  );


-- insert categories
INSERT INTO
  categories(slug, name)
VALUES
  ('laptops', 'Laptops'),
  ('pc', 'PC'),
  ('teclados', 'Teclados'),
  ('mouse', 'Mouse'),
  ('monitores', 'Monitores'),
  ('impresoras', 'Impresoras'),
  ('tarjetas-graficas', 'Tarjetas Gráficas'),
  ('auriculares', 'Auriculares'),
  ('almacenamiento', 'Almacenamiento'),
  ('smartphones', 'Smartphones'),
  ('tablets', 'Tablets'),
  ('cámaras', 'Cámaras'),
  ('accesorios', 'Accesorios'),
  ('software', 'Software'),
  ('redes', 'Redes');


-- insert products
INSERT INTO
  products(
    name,
    image,
    inventaryMin,
    priceSale,
    unit,
    saleFor,
    categoryId
  )
VALUES
  (
    'Laptop ASUS X1',
    'https://unavatar.io/notebook',
    10,
    999.99,
    'Unidad',
    'Cantidad',
    1
  ),
  (
    'PC Gamer XYZ',
    'https://unavatar.io/notebook',
    8,
    1499.99,
    'Unidad',
    'Unidad/NS',
    2
  ),
  (
    'Teclado Mecánico RGB',
    'https://unavatar.io/notebook',
    15,
    59.99,
    'Unidad',
    'Cantidad',
    3
  ),
  (
    'Mouse Inalámbrico Logitech',
    'https://unavatar.io/notebook',
    5,
    29.99,
    'Unidad',
    'Cantidad',
    4
  ),
  (
    'Monitor LED 27"',
    'https://unavatar.io/notebook',
    10,
    249.99,
    'Unidad',
    'Cantidad',
    5
  ),
  (
    'Impresora HP LaserJet',
    'https://unavatar.io/notebook',
    12,
    299.99,
    'Unidad',
    'Cantidad',
    6
  ),
  (
    'Tarjeta Gráfica NVIDIA RTX 3080',
    'https://unavatar.io/notebook',
    7,
    699.99,
    'Unidad',
    'Unidad/NS',
    7
  ),
  (
    'Auriculares Sony WH-1000XM4',
    'https://unavatar.io/notebook',
    8,
    199.99,
    'Unidad',
    'Cantidad',
    8
  ),
  (
    'Disco Duro SSD 1TB',
    'https://unavatar.io/notebook',
    20,
    89.99,
    'Unidad',
    'Cantidad',
    9
  ),
  (
    'Smartphone Samsung Galaxy S22',
    'https://unavatar.io/notebook',
    10,
    799.99,
    'Unidad',
    'Cantidad',
    10
  ),
  (
    'Tablet Apple iPad Pro',
    'https://unavatar.io/notebook',
    5,
    599.99,
    'Unidad',
    'Unidad/NS',
    11
  ),
  (
    'Cámara Canon EOS 5D Mark IV',
    'https://unavatar.io/notebook',
    8,
    1799.99,
    'Unidad',
    'Cantidad',
    12
  ),
  (
    'Funda para Portátil',
    'https://unavatar.io/notebook',
    15,
    19.99,
    'Unidad',
    'Cantidad',
    13
  ),
  (
    'Software Microsoft Office 365',
    'https://unavatar.io/notebook',
    5,
    49.99,
    'Unidad',
    'Cantidad',
    14
  ),
  (
    'Router Inalámbrico TP-Link',
    'https://unavatar.io/notebook',
    10,
    39.99,
    'Unidad',
    'Cantidad',
    15
  );


-- insert locations
INSERT INTO
  LOCATIONS(name, address)
VALUES
  ('Local Mariscal', 'Jr. Mariscal cáceres'),
  ('Local Bellido', 'Jr. Bellido 404'),
  ('Almacén Asamblea', 'Jr. Asamblea'),
  ('Local Asamblea', 'Jr. Asamblea');


-- insert suppliers
INSERT INTO
  suppliers(RUC, name, address, phone)
VALUES
  (
    '20123456789',
    'Tecnosoluciones S.A.C',
    'Av. Tecnológica 123, Distrito Techville, Lima',
    '987654321'
  ),
  (
    '20456789123',
    'MegaElectrónica EIRL',
    'Calle Electronica 456, Distrito Techland, Lima',
    '987654322'
  ),
  (
    '20345678912',
    'ElectroniCorp S.A.C',
    'Av. de la Innovación 789, Distrito Electropolis, Lima',
    '987654323'
  ),
  (
    '20678912345',
    'Infotech Solutions EIRL',
    'Calle de la Información 234, Distrito Infocity, Lima',
    '987654324'
  ),
  (
    '20987654321',
    'TechWorld Group S.A.C',
    'Av. TechPark 567, Distrito Digitown, Lima',
    '987654325'
  ),
  (
    '20234567890',
    'MegaCompuNet EIRL',
    'Calle de la Computación 890, Distrito Cybercity, Lima',
    '987654326'
  ),
  (
    '20567891234',
    'DataWare Systems S.A.C',
    'Av. Datacenter 123, Distrito Datacenteria, Lima',
    '987654327'
  ),
  (
    '20890123456',
    'InnoSoft Corporation S.A.C',
    'Calle Innovación 456, Distrito Innovatown, Lima',
    '987654328'
  ),
  (
    '20789012345',
    'ElectroTech Innovations EIRL',
    'Av. Electroinnova 789, Distrito Electroinnovia, Lima',
    '987654329'
  ),
  (
    '20123456789',
    'InfoLink S.A.C',
    'Calle de la Información 234, Distrito Infotech, Lima',
    '987654330'
  );


SELECT
  *
FROM
  suppliers;