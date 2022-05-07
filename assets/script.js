var before = `header.header

  div.header-left

    img!.logo [src](./doc/logo.svg)
    h1 "smallDom.js"

  div.header-right

    a [data-core-button] [href](./doc/) 
      "Documentation"

    a [data-core-icon]
      svg.git
        use [xlink:href](#icon-github)`;

var array = before.split('\n');
var lines = '';

var numSdom = document.querySelector('.demo .before .num');
var contentSdom = document.querySelector('.demo .before .content');

var numHtml = document.querySelector('.demo .after .num');
var contentHtml = document.querySelector('.demo .after .content');

var i = 0;

function addLine(){

    if(i >= array.length){ return; }

    var line = array[i] || ' ';
    lines += line+'\n';
    i++;

    numSdom.innerHTML += '<p>'+i+'</p>';
    contentSdom.innerHTML += '<p></p>';

    var j = 0;
    var currentLine = document.querySelector('.demo .before .content p:last-child');

    addChar();

    function addChar() {
        setTimeout(function() {

            if(j >= line.length){

                setTimeout(function() {

                  updateHTML();
                  
                  if(line === ' '){
                    addLine();
                    return;
                  }
                  
                  currentLine.innerHTML = highlightCode(escapeHTML(currentLine.textContent) || ' ', 'sdom');
  
                  setTimeout(function() {
                    addLine();
                  }, 500);

                }, 100);

                return;
                
            }

            currentLine.textContent += line[j];
            j++;

            addChar();
        }, 50);
    }

    // update HTML part
    function updateHTML(){

        var HTMLcode = smallDomTranspile(lines, {mode: 'pre'});
        var HTMLarray = HTMLcode.split('\n');

        var HTML = ['', ''];
        for(var u=0; u<HTMLarray.length; u++){

            HTML[0]+='<p>'+(u+1)+'</p>';
            HTML[1]+='<p>'+highlightCode(escapeHTML(HTMLarray[u] || ' '), 'html')+'</p>';

        }

        numHtml.innerHTML = HTML[0];
        contentHtml.innerHTML = HTML[1];

    }

}

addLine();
