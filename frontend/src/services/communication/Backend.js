import Auth from './private/Auth';
import Fetcher from './private/Fetcher';
import CachedFetcher from './private/CachedFetcher';
import Query from './private/Query';
import Command from './private/Command';

class Backend {
   constructor() {
      this.fetcher = new Fetcher();
      this.auth = new Auth( this.fetcher );
      this.command = new Command( this.fetcher, this.auth );
      this.cache = new CachedFetcher( this.fetcher );
      this.query = new Query( this.fetcher, this.cache, this.auth );
   }
}

export default Backend;
