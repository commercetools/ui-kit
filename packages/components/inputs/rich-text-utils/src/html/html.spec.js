import { JSDOM } from 'jsdom';
import html from './html';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

describe('html', () => {
  describe('deserialize', () => {
    describe('with empty paragraph', () => {
      it('should return empty string', () => {
        const htmlValue = '<p></p>';
        expect(html.serialize(html.deserialize(htmlValue))).toEqual('');
      });
    });
    describe('with inline span styles', () => {
      describe('with no styles', () => {
        it('should properly serialize', () => {
          const htmlValue = '<span>hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><span>hello</span></p>'
          );
        });
      });
      describe('with one known value', () => {
        it('should properly serialize', () => {
          const htmlValue = '<span style="font-weight: bold;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><strong>hello</strong></p>'
          );
        });
      });
      describe('with one unknown value', () => {
        it('should properly serialize', () => {
          const htmlValue = '<span style="display: block;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><span>hello</span></p>'
          );
        });
      });
      describe('with one unknown value and one known value', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="display: block; text-decoration: underline;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><u>hello</u></p>'
          );
        });
      });
      describe('with two known values', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="font-weight: bold; text-decoration: underline;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><u><strong>hello</strong></u></p>'
          );
        });
      });
      describe('with three known values', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="font-weight: bold; font-style: italic; text-decoration: underline;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><u><em><strong>hello</strong></em></u></p>'
          );
        });
      });
      describe('with four known values', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="font-weight: bold; font-style: italic; text-decoration-line: underline line-through;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><del><u><em><strong>hello</strong></em></u></del></p>'
          );
        });
      });
      describe('with line breaks', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<p><span style="text-decoration-line: underline;">Underline</span></p><p><span style="text-decoration-line: line-through;">Strikethrough</span></p>';
          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><u>Underline</u></p><p><del>Strikethrough</del></p>'
          );
        });
      });

      describe('with links', () => {
        it('should handle links with minimal attributes', () => {
          const htmlValue =
            '<p>This is another <a href="https://minimal.com">link</a> with minimal attributes</p>';
          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p>This is another <a href="https://minimal.com">link</a> with minimal attributes</p>'
          );
        });
      });

      describe('mixed', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="font-weight: bold"><span style="font-style: italic;">hello</span></span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><em><strong>hello</strong></em></p>'
          );
        });
      });
      describe('nested elements within text and unsupported element tags (table, img)', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<ol><li><span style="font-weight: bold; font-family: &quot;Comic Sans MS&quot;;">Computermouse for <span style="text-decoration-line: underline;">controlling</span></span></li></ol><table class="table table-bordered"><tbody><tr><td>hello</td></tr><tr><td><p>world<img src="https://www.rollingstone.com/wp-content/uploads/2019/01/shutterstock_10010937aj.jpg" style="width: 100%; float: right;" class="pull-right img-circle"></p></td></tr></tbody></table><ol><li><span style="font-weight: bold; font-family: &quot;Comic Sans MS&quot;;"><span style="text-decoration-line: underline;"><br></span></span></li></ol>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<ol><li><strong>Computermouse for </strong><u><strong>controlling</strong></u></li></ol>hello<p>world</p><ol><li><u><strong><br/></strong></u></li></ol>'
          );
        });
      });
    });
    describe('multiple nested text nodes within parent text node', () => {
      it('should properly serialize', () => {
        const htmlValue =
          '<p><del>first</del><del><sup>second</sup></del><del><sub><sup>third</sup></sub></del></p>';

        expect(html.serialize(html.deserialize(htmlValue))).toEqual(
          '<p><del>first</del><del><sup>second</sup></del><del><sub><sup>third</sup></sub></del></p>'
        );
      });
    });
    describe('with invalid markup passed to text node', () => {
      it('should properly serialize and replace with information', () => {
        const htmlValue = `<p>\r\n<em>Bitte beachten Sie: Die Lieferung erfolgt nach Verf&uuml;gbarkeit - Jahrgangs- und Designw&uuml;nschen k&ouml;nnen wir leider nicht nachkommen. Wir danken Ihnen f&uuml;r Ihr Verst&auml;ndnis.</em>\r\n</p>\r\n\r\n<h3>Informationen zum Gold K&auml;nguru 1/4</h3>\r\n<p>\r\nDer <strong>Australian Nugget (Gold K&auml;nguru)</strong> ist eine australische Goldm&uuml;nze, die erstmals 1986 von der Perth Mint gepr&auml;gt wurde und sich vor allem dank der j&auml;hrlich wechselnden Motive auf der Vorderseite weltweiter Beliebtheit erfreut. Die M&uuml;nze hat einen Feingehalt von 999,9 und gilt als offizielles Zahlungsmittel.\r\n</p>\r\n\r\n<p >\r\nSeit 1987 wird der <strong>Australian Nugget</strong> in den St&uuml;ckelungen 1/20 Unze, 1/10 Unze, 1/4 Unze, 1/2 Unze und 1 Unze gepr&auml;gt, der Nennwert liegt zwischen 5 und 100 australischen Dollar. Mittlerweile existieren aber auch gr&ouml;&szlig;ere St&uuml;ckelungen mit einem Gewicht von 2 Unzen, 10 Unzen sowie 1 Kilogramm. Im Jahr 2010 wurde eine 2-Dollar-Version der M&uuml;nze mit einem Gewicht von 0,5 Gramm aufgelegt. 2011 stellte die Perth Mint zudem eine Ausgabe der M&uuml;nze mit einem Gewicht von 1 Tonne vor &ndash; damit ist der <strong>Gold K&auml;nguru</strong> zugleich die kleinste und gr&ouml;sste Anlagem&uuml;nze der Welt.\r\n</p>\r\n\r\n<p>\r\nBis 1989 wurden auf der Vorderseite der M&uuml;nze au&szlig;ergew&ouml;hnliche, in Australien gefundene Goldnuggets abgebildet &ndash; daher auch der Name <strong>Australian Nugget</strong>. Seit 1990 zeigt die Goldm&uuml;nze j&auml;hrlich wechselnde Motive von K&auml;ngurus, der offizielle Name lautet seitdem &bdquo;Australian Kangaroo&ldquo;. Gr&ouml;&szlig;ere Einheiten des <strong>Gold K&auml;nguru</strong>, wie die 2-Unzen-, 10-Unzen- und 1-Kilogramm-Version tragen j&auml;hrlich das gleiche Motiv des &bdquo;Red Kangaroo&ldquo;. Auf der R&uuml;ckseite der Goldm&uuml;nze findet sich - wie bei allen Commonwealth-M&uuml;nzen - das Portr&auml;t von K&ouml;nigin Elizabeth II.\r\n</p>\r\n<p>\r\n</p>\r\n<h3>\r\nGold K&auml;nguru 1/4 kaufen bei philoro kaufen\r\n</h3>\r\n<p>\r\n\tNeben der <strong>Gold Känguru 1/4/strong> finden Sie bei uns eine breite Auswahl renommierter <a href="https://philoro.ch/shop/goldmuenzen" target="_blank" title="Goldmünzen kaufen" style="text-decoration: none; color: #86754f;">Goldmünzen</a> aus aller Welt. Gerne bieten wir Ihnen zum Thema Anlagemünzen unsere umfassende Beratung an. Wir garantieren für die von uns vertriebenen Produkte höchste Qualität. Deshalb arbeiten wir ausschliesslich mit international anerkannten und etablierten Herstellern zusammen.\r\n</p>\r\n\r\n<p>\r\nBesuchen Sie uns in einer unserer <a href="https://philoro.ch/filialen" target="_blank" title="Unsere Filialen" style="text-decoration: none; color: #86754f;">Filialen</a> und überzeugen Sie sich selbst, oder bestellen Sie einfach und bequem online.\r\n</p>\r\n`;
        expect(html.serialize(html.deserialize(htmlValue))).toEqual(
          `<p><br/><em>Bitte beachten Sie: Die Lieferung erfolgt nach Verfügbarkeit - Jahrgangs- und Designwünschen können wir leider nicht nachkommen. Wir danken Ihnen für Ihr Verständnis.</em><br/></p><p><br/><br/></p><h3>Informationen zum Gold Känguru 1/4</h3><p><br/></p><p><br/>Der <strong>Australian Nugget (Gold Känguru)</strong> ist eine australische Goldmünze, die erstmals 1986 von der Perth Mint geprägt wurde und sich vor allem dank der jährlich wechselnden Motive auf der Vorderseite weltweiter Beliebtheit erfreut. Die Münze hat einen Feingehalt von 999,9 und gilt als offizielles Zahlungsmittel.<br/></p><p><br/><br/></p><p><br/>Seit 1987 wird der <strong>Australian Nugget</strong> in den Stückelungen 1/20 Unze, 1/10 Unze, 1/4 Unze, 1/2 Unze und 1 Unze geprägt, der Nennwert liegt zwischen 5 und 100 australischen Dollar. Mittlerweile existieren aber auch größere Stückelungen mit einem Gewicht von 2 Unzen, 10 Unzen sowie 1 Kilogramm. Im Jahr 2010 wurde eine 2-Dollar-Version der Münze mit einem Gewicht von 0,5 Gramm aufgelegt. 2011 stellte die Perth Mint zudem eine Ausgabe der Münze mit einem Gewicht von 1 Tonne vor – damit ist der <strong>Gold Känguru</strong> zugleich die kleinste und grösste Anlagemünze der Welt.<br/></p><p><br/><br/></p><p><br/>Bis 1989 wurden auf der Vorderseite der Münze außergewöhnliche, in Australien gefundene Goldnuggets abgebildet – daher auch der Name <strong>Australian Nugget</strong>. Seit 1990 zeigt die Goldmünze jährlich wechselnde Motive von Kängurus, der offizielle Name lautet seitdem „Australian Kangaroo“. Größere Einheiten des <strong>Gold Känguru</strong>, wie die 2-Unzen-, 10-Unzen- und 1-Kilogramm-Version tragen jährlich das gleiche Motiv des „Red Kangaroo“. Auf der Rückseite der Goldmünze findet sich - wie bei allen Commonwealth-Münzen - das Porträt von Königin Elizabeth II.<br/></p><p><br/></p><p><br/></p><p><br/></p><h3><br/>Gold Känguru 1/4 kaufen bei philoro kaufen<br/></h3><p><br/></p><p><br/>\tNeben der <strong>Gold Känguru 1/4/strong&gt; finden Sie bei uns eine breite Auswahl renommierter </strong><strong>Invalid markup</strong><strong> aus aller Welt. Gerne bieten wir Ihnen zum Thema Anlagemünzen unsere umfassende Beratung an. Wir garantieren für die von uns vertriebenen Produkte höchste Qualität. Deshalb arbeiten wir ausschliesslich mit international anerkannten und etablierten Herstellern zusammen.<br/></strong></p><strong><br/><br/></strong><strong>Invalid markup</strong><strong><br/></strong>`
        );
      });
    });

    describe('handles (soft-)line-breaks', () => {
      it('does remove line-break (\\n) characters from html-input', () => {
        const htmlValue = `<p>How much\n is the fish?</p>`;

        expect(html.deserialize(htmlValue)).toEqual([
          { children: [{ text: 'How much is the fish?' }], type: 'paragraph' },
        ]);
      });
      it('does transform <br/> tags into slate-nodes', () => {
        const htmlValue = `<p>How much<br/> is the fish?</p><br/>`;

        expect(html.deserialize(htmlValue)).toEqual([
          {
            children: [
              {
                text: 'How much',
              },
              {
                text: '\n',
              },
              {
                text: ' is the fish?',
              },
            ],
            type: 'paragraph',
          },
          {
            text: '\n',
          },
        ]);
      });

      it('does transform line-break characters (\\n) into <br/> tags', () => {
        const node = {
          children: [
            {
              text: 'How much',
            },
            {
              text: '\n',
            },
            {
              text: ' is the fish?',
            },
          ],
          type: 'paragraph',
        };

        expect(html.serialize(node)).toEqual(
          `<p>How much<br/> is the fish?</p>`
        );
      });

      it('does preserve <br/> tags (line-breaks) from html-input to html-output', () => {
        const htmlValue = `<p>How much<br/> is the fish?</p>`;
        expect(html.serialize(html.deserialize(htmlValue))).toEqual(
          '<p>How much<br/> is the fish?</p>'
        );
      });
    });
  });
});
