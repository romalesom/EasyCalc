
CREATE SCHEMA IF NOT EXISTS "companyName";

SET search_path TO "companyName";

CREATE TABLE IF NOT EXISTS "companyName"."master_data" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "salesRevenue" INTEGER NOT NULL DEFAULT 0,
    "materialCosts" INTEGER NOT NULL DEFAULT 0,
    "personnelCostsProduction" INTEGER NOT NULL DEFAULT 0,
    "personnelCostsAdministration" INTEGER NOT NULL DEFAULT 0,
    "productionHoursCapacity" INTEGER NOT NULL DEFAULT 0,
    depreciation INTEGER DEFAULT 0,
    "roomCosts" INTEGER DEFAULT 0,
    "insuranceFees" INTEGER DEFAULT 0,
    "advertisingAndTravelCosts" INTEGER DEFAULT 0,
    "vehicleCosts" INTEGER DEFAULT 0,
    "businessTaxes" INTEGER DEFAULT 0,
    "costOfGoodsSold" INTEGER DEFAULT 0,
    leasing INTEGER DEFAULT 0,
    "itCosts" INTEGER DEFAULT 0,
    "machineCosts" INTEGER DEFAULT 0,
    repairs INTEGER DEFAULT 0,
    "interestExpenses" INTEGER DEFAULT 0,
    "otherCosts" INTEGER DEFAULT 0,
    "plannedProfit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "companyName"."users" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "companyName"."calculation_results" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "calculationId" VARCHAR NOT NULL,
    "resultValues" JSONB NOT NULL,
    "trafficLight" VARCHAR NOT NULL,
    score NUMERIC,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "companyName"."calculation_inputs" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "hoursSpent" INTEGER NOT NULL DEFAULT 0,
    "materialsConsumed" INTEGER NOT NULL DEFAULT 0,
    "outsourcedServicesAndEquipment" INTEGER NOT NULL DEFAULT 0,
    "priceEstimate" NUMERIC(10, 2),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "userId" UUID NOT NULL,
    CONSTRAINT "FK_userId"
        FOREIGN KEY ("userId")
        REFERENCES "companyName"."users"(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "companyName"."audit_logs" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "entityName" VARCHAR NOT NULL,
    "entityId" VARCHAR NOT NULL,
    "changedBy" VARCHAR,
    "changeType" VARCHAR NOT NULL,
    "oldValue" JSONB,
    "newValue" JSONB,
    "changedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
