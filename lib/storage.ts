import { openDB, DBSchema, IDBPDatabase } from 'idb'
import { Photo, Trip, Magazine } from './types'

interface MagsDB extends DBSchema {
  trips: {
    key: string
    value: Trip
    indexes: { 'by-date': string }
  }
  photos: {
    key: string
    value: Photo
    indexes: { 'by-trip': string }
  }
  magazines: {
    key: string
    value: Magazine
  }
}

let db: IDBPDatabase<MagsDB> | null = null

async function getDB(): Promise<IDBPDatabase<MagsDB>> {
  if (db) return db
  db = await openDB<MagsDB>('mags-db', 1, {
    upgrade(database) {
      const tripStore = database.createObjectStore('trips', { keyPath: 'id' })
      tripStore.createIndex('by-date', 'createdAt')

      const photoStore = database.createObjectStore('photos', { keyPath: 'id' })
      photoStore.createIndex('by-trip', 'tripId')

      database.createObjectStore('magazines', { keyPath: 'id' })
    },
  })
  return db
}

export async function saveTrip(trip: Trip): Promise<void> {
  const database = await getDB()
  await database.put('trips', trip)
}

export async function getTrip(id: string): Promise<Trip | undefined> {
  const database = await getDB()
  return database.get('trips', id)
}

export async function getAllTrips(): Promise<Trip[]> {
  const database = await getDB()
  const trips = await database.getAllFromIndex('trips', 'by-date')
  return trips.reverse()
}

export async function deleteTrip(id: string): Promise<void> {
  const database = await getDB()
  const photos = await getPhotosByTrip(id)
  const tx = database.transaction(['trips', 'photos', 'magazines'], 'readwrite')
  await tx.objectStore('trips').delete(id)
  await tx.objectStore('magazines').delete(id)
  for (const photo of photos) {
    await tx.objectStore('photos').delete(photo.id)
  }
  await tx.done
}

export async function savePhoto(photo: Photo): Promise<void> {
  const database = await getDB()
  await database.put('photos', photo)
}

export async function getPhoto(id: string): Promise<Photo | undefined> {
  const database = await getDB()
  return database.get('photos', id)
}

export async function getPhotosByTrip(tripId: string): Promise<Photo[]> {
  const database = await getDB()
  const photos = await database.getAllFromIndex('photos', 'by-trip', tripId)
  return photos.sort((a, b) => a.order - b.order)
}

export async function saveMagazine(magazine: Magazine): Promise<void> {
  const database = await getDB()
  await database.put('magazines', magazine)
}

export async function getMagazine(tripId: string): Promise<Magazine | undefined> {
  const database = await getDB()
  return database.get('magazines', tripId)
}
