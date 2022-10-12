import { Injectable } from '@angular/core';
import { IPFS, create } from 'ipfs-core';
import { BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IPFSService {
  private _ipfsSource = new BehaviorSubject<null | IPFS>(null);
  private _createIPFSNodePromise: Promise<IPFS>;

  private get LocalIPFS() {
    const getter = async () => {
      let node = this._ipfsSource.getValue();

      if (node == null) {
        console.log("Waiting for node creation...")

        node = await this._createIPFSNodePromise as IPFS
        this._ipfsSource.next(node);
      }

      return node;
    }

    return getter();
  }

  constructor() {
    const ipfsOptions = {
      repo: './ipfs',
      EXPERIMENTAL: {
        ipnsPubsub: true,
      },
      config: {
        Addresses: {
          Swarm: [
            // Use IPFS dev signal server
            // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
            // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
            // Use IPFS dev webrtc signal server
            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
            '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
            // Use local signal server
            //'/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
          ]
        },
      }
    };

    // TODO: Check for connection
    // via try/catch? There might be explicit functionality
    this._createIPFSNodePromise = create(ipfsOptions);
  }

  async getLocalNode() {
    const node = await this.LocalIPFS;
    return node;
  }
}
