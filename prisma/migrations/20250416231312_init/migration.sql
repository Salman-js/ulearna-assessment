-- CreateEnum
CREATE TYPE "Category" AS ENUM ('tshirt', 'hoodie', 'hat');

-- CreateEnum
CREATE TYPE "View" AS ENUM ('front', 'back', 'left', 'right');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('white', 'gray', 'black');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('sm', 'm', 'lg');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Delivered', 'Canceled');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT,
    "longDescription" TEXT,
    "category" "Category" NOT NULL,
    "defaultVariantId" TEXT NOT NULL,
    "views" "View"[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "size" "Size" NOT NULL,
    "color" "Color" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'Pending',
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariantOrder" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "productId" TEXT,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductVariantOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_defaultVariantId_key" ON "Product"("defaultVariantId");

-- CreateIndex
CREATE INDEX "Product_name_defaultVariantId_idx" ON "Product"("name", "defaultVariantId");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "ProductVariantOrder_orderId_productId_idx" ON "ProductVariantOrder"("orderId", "productId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_defaultVariantId_fkey" FOREIGN KEY ("defaultVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantOrder" ADD CONSTRAINT "ProductVariantOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantOrder" ADD CONSTRAINT "ProductVariantOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
