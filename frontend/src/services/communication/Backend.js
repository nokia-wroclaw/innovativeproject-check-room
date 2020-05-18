import Auth from './private/Auth';
import Fetcher from './private/Fetcher';
import CachedFetcher from './private/CachedFetcher';
import Query from './private/Query';
import Command from './private/Command';

class Backend {
   constructor() {
      this.auth = new Auth();

      this.fetcher = new Fetcher();
      this.command = new Command( this.fetcher );

      this.cache = new CachedFetcher( this.fetcher );
      this.query = new Query( this.cache );
   }
}

export default Backend;
