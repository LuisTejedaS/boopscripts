/**
    {
        "api":1,
        "name":"Js JSON To Formatted JSON",
        "description":"Converts a Js json string to a Formated JSON",
        "author":"LuisTejedaS",
        "icon":"broom",
        "tags":"json,js,object,convert",
        "bias": -0.1
    }
**/

function main(input){
  input.text = (input.text + '').replace(/(\\r\\n|\\n|\\r)/g, '');
  input.text = (input.text + '').replace(/(\\t)/g, '\t');
	input.text = (input.text + '')
	    .replace(/\\(.?)/g, function (s, n1) {
	      switch (n1) {
	        case '\\':
	          return '\\'
	        case '0':
	          return '\u0000'
	        case '':
	          return ''
	        default:
	          return n1
	    	}
    });

    try {
      // I feel like this should have a real parser/formatter
      // but hey, it works so who am I to judge?
      let sliceInitial = 0;
      let sliceIFinal = input.text.length;
      if(input.text[0]=== '"'){
        sliceInitial = 1;
      }
      if(input.text[input.text.length - 1]=== '"'){
        sliceIFinal = input.text.length - 1;
      }
      input.text = input.text.slice(sliceInitial, sliceIFinal);
      input.text = JSON.stringify(JSON.parse(input.text), null, 2);
    }
    catch(error) {
      state.postError("Invalid JSON")
    }
}
