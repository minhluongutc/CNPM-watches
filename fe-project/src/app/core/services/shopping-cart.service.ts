import {Injectable} from "@angular/core";
import {Watch} from "../../models/watch.model";

@Injectable()
export class ShoppingCartService {
  private watchesInCart: Watch[] = [
    new Watch(
      1,
      'SANTOS DE CARTIER WATCH',
      'Medium model, automatic movement, steel, interchangeable metal and leather straps',
      7050,
      true,
      'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw0def5065/images/large/989df64c6ea052df93fdbfe6ff8afb7f.png?sw=350&sh=350&sm=fit&sfrm=png',
      [
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw0def5065/images/large/989df64c6ea052df93fdbfe6ff8afb7f.png?sw=750&sh=750&sm=fit&sfrm=png',
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw9a8cbbd4/images/large/c8c6c890aa8a5db6ab27eee83a5d88fd.png?sw=750&sh=750&sm=fit&sfrm=png',
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw6d3f5873/images/large/2964993b0026595382a88df999ff6a75.png?sw=750&sh=750&sm=fit&sfrm=png',
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw66eeb3ed/images/large/a7cd1967f0d9555990de24db7316ec7b.png?sw=750&sh=750&sm=fit&sfrm=png',
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw40d0286e/images/large/40f035a2ccfc5a51a52f17b80bc8d944.png?sw=750&sh=750&sm=fit&sfrm=png',
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwf389778c/images/large/6d9f4347a8ea5c2193d37f3095d5706f.png?sw=750&sh=750&sm=fit&sfrm=png',
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw770292e9/images/large/e4bcd592023d5b1b901765db7c6bf7c5.png?sw=750&sh=750&sm=fit&sfrm=png',
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw69b696f4/images/large/fba0e352a6515443a88073a18ab8b039.png?sw=750&sh=750&sm=fit&sfrm=png',
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwa8bfd391/images/large/a8ed457be24a54a4a8fc5a85d949225d.png?sw=750&sh=750&sm=fit&sfrm=png',
        'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwc38f5f93/images/large/2b735ae18cbe52679eb63ed3cc281e46.png?sw=750&sh=750&sm=fit&sfrm=png'
      ]
    ),
    new Watch(
      2,
      'SANTOS DE CARTIER WATCH',
      'Santos watch, medium model, Manufacture mechanical movement with automatic winding, caliber 1847...',
      7050,
      false,
      'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw811d7fc2/images/large/fba17eee43a75111b165c7590453d5ab.png?sw=350&sh=350&sm=fit&sfrm=png',
      []
    ),
    new Watch(
      3,
      'SANTOS DE CARTIER WATCH',
      'Medium model, automatic movement, yellow gold, steel, interchangeable metal and leather bracelets',
      10300,
      false,
      'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw4122c9b5/images/large/eaa0d8c43d5352ddaf3bec019d4c626c.png?sw=350&sh=350&sm=fit&sfrm=png',
      []
    ),
    new Watch(
      4,
      'SANTOS DE CARTIER WATCH',
      'Large model, automatic movement, rose gold, interchangeable metal and leather bracelets',
      36100,
      true,
      'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw4ef1aeaf/images/large/b68279b842205cfc9536eab68ab597b1.png?sw=350&sh=350&sm=fit&sfrm=png',
      []
    )
  ];
  showCartItem: boolean = false;

  onShow() {
    this.showCartItem = true;
  }

  onClose() {
    this.showCartItem = false;
  }

  getWatchesInCart() {
    return this.watchesInCart.slice();
  }

  getTotalWatches(): number {
    return this.watchesInCart.length;
  }

  getTotalPrice(): number {
    return this.watchesInCart.reduce((total, watch) => watch.price + total, 0);
  }
}
