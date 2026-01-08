-- Script SQL para crear la tabla en Supabase
-- Copia y pega esto en el SQL Editor de Supabase

CREATE TABLE roulette_history (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  week_number INTEGER NOT NULL,
  group_3 TEXT[] NOT NULL,
  group_2 TEXT[] NOT NULL,
  schedule_3 TEXT NOT NULL,
  schedule_2 TEXT NOT NULL,
  days_3 TEXT[] NOT NULL,
  days_2 TEXT[] NOT NULL
);

-- Crear índice para ordenar por fecha
CREATE INDEX idx_roulette_created_at ON roulette_history(created_at DESC);

-- Permitir acceso público (sin autenticación)
ALTER TABLE roulette_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON roulette_history
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON roulette_history
  FOR SELECT USING (true);
