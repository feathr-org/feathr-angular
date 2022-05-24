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

  async loadLocalInstance(IPFS: any) {
    this._localInstance = await OrbitDB.createInstance(IPFS);
    this._peerId = await this._localInstance.identity.id;
  }
}
