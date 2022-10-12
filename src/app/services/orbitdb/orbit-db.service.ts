import { Injectable } from '@angular/core';
import { IPFS, create } from 'ipfs-core';
import { BehaviorSubject, } from 'rxjs';

declare var OrbitDB: any;

@Injectable({
  providedIn: 'root'
})
export class OrbitDBService {
  private _localInstance: any;
  private _peerId: string | null = null;
  private _files = new Map<string, any>();

  async loadLocalInstance(IPFS: any) {
    this._localInstance = await OrbitDB.createInstance(IPFS);
    this._peerId = await this._localInstance.identity.id;
  }

  async createFile(filename: string): Promise<string> {
    const db = await this._localInstance.eventlog(filename);
    const address = await db.id;
    this._files.set(address, db);
    return address;
  }

  async updateFile(address: string, blob: Blob) {
    const db = this._files.get(address);
    if (db) {
      await db.add(blob);
    } else {
      console.log("Error: Attempt to update file that has not been loaded: " + address);
    }
  }

  async openFile(address: string) {
    const db = await this._localInstance.open(address);

    if (db) {
      this._files.set(address, db);
    }

    return db;
  }
}
