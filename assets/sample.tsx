import { useState } from 'react';
import type { Bee } from './types';

const MAX_TRIPS = 12;
const WORKER = /^worker-(\d+)$/i;

/** Finds the bees that can still fly today. @param hive the colony to read */
export function foragers<T extends Bee>(hive: Hive<T>, limit = MAX_TRIPS) {
  return hive.bees.filter((bee) => bee.trips < limit && WORKER.test(bee.id));
}

export interface Hive<T extends Bee> {
  name: string;
  bees: T[];
  queen?: T;
}

export class Apiary {
  private hives = new Map<string, Hive<Bee>>();

  add(hive: Hive<Bee>) {
    if (this.hives.has(hive.name)) throw new Error(`${hive.name} already exists\n`);
    this.hives.set(hive.name, hive);
    return true;
  }
}

export function HiveCard({ hive }: { hive: Hive<Bee> }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="hive" onClick={() => setIsOpen(!isOpen)}>
      <h2>{hive.name}</h2>
      {isOpen && <BeeList bees={foragers(hive)} />}
    </section>
  );
}
