import chroma from 'chroma-js';

const levels = [50,100,200,300,400,500,600,700,800,900]

function generatePalette(starterPallette){

  let newPallette = {
    palletteName : starterPallette.palletteName,
    id: starterPallette.id,
    emoji: starterPallette.emoji,
    colors:{}
  }

  for(let level of levels){
    newPallette.colors[level] = [];

  }

  for(let color of starterPallette.colors){
    let scale = generateScale(color.color,10).reverse();
    for(let i in scale){
      newPallette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css().replace("rgb","rgba").replace(")",",1.0)")
      });
    }
  }


  return newPallette

}

function getRange(hexColor){
  const end = "fff"

  return [
    chroma(hexColor).darken(1.4).hex(),
    hexColor,
    end
  ];
  //this generates an array with the color variation from dark to white. We are using dark instead of black cause black would generate too many dark / black colors on the begining of the spectrum.
  // this function should return an array with the dark version of the color, the color and white in rgb code = [123,1234,white]
}

function generateScale(hexColor,numberOfColors){

  return chroma
  .scale(getRange(hexColor))
  .mode("lab")
  .colors(numberOfColors);

}


export {generatePalette};