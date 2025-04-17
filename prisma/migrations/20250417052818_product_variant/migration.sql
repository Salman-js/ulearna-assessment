-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_defaultVariantId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "defaultVariantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_defaultVariantId_fkey" FOREIGN KEY ("defaultVariantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
