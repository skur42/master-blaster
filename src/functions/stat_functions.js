
function checkForDNB(score) {
  return score != 'DNB' && score != 'TDNB'
}

function checkForStar(score) {
  return score.slice(-1) == '*'
}

function getMatchesWon(career_data) {
  let won=0
  let lost=0
  let tied=0
  
  career_data.map((match)=>{
     if(checkForDNB(match.batting_score)) {
        if(match.match_result=='won') {
          won+=1
        }
        else if(match.match_result=='lost') {
          lost+=1
        }
        else {
          tied+=1
        }
     }
  })
  return [won,lost,tied] 
}

function getRuns(career_data) {
  let totalRuns=0
  
  career_data.map((match)=>{
    if(checkForDNB(match.batting_score)) {
      if(match.batting_score.slice(-1)=='*') {
        let runs=parseInt(match.batting_score.slice(0,match.batting_score.length-1))
        totalRuns+=runs
      }
      else
      {
        let runs=parseInt(match.batting_score)
        totalRuns+=runs
      }
    }
  })
  return totalRuns;
}

function getCenturies(career_data) {
  let halfCentury=0
  let fullCentury=0
  
  career_data.map((match)=>{
    if(checkForDNB(match.batting_score)) {
      if(match.batting_score.slice(-1)=='*') {
        let runs=parseInt(match.batting_score.slice(0,match.batting_score.length-1))
        if(runs>=100) {
          fullCentury+=1
        }
        else if(runs>=50 && runs<=100) {
          halfCentury+=1
        }
      }
      else
      {
        let runs=parseInt(match.batting_score)
        if(runs>=100) {
          fullCentury+=1
        }
        else if(runs>=50 && runs<=100) {
          halfCentury+=1
        }
      }
    }
  })
  return [halfCentury,fullCentury]
}

function getCatches(career_data) {
  let catches=0

  career_data.map((match)=>{
    if(match.catches !== '-') {
      let catching=parseInt(match.catches)
      catches+=catching
    }
  })
  return catches
}

function getCountryStats(country, career_data) {
  let matches=0;
  let fifty=0;
  let hundred=0;
  let totalRuns=0;
  let catches=0;

  career_data.map((match) => {
    if(match.opposition.substring(2,match.opposition.length)==country) {
      matches+=1

      if(match.catches !== '-') {
        let catching=parseInt(match.catches)
        catches+=catching
      }

      if(checkForDNB(match.batting_score)) {
        if(match.batting_score.slice(-1)=='*') {
          let runs=parseInt(match.batting_score.slice(0,match.batting_score.length-1))
          if(runs>=100) {
            hundred+=1
          }
          else if(runs>=50 && runs<=100) {
            fifty+=1
          }
          totalRuns+=runs
        }
        else {
          let runs=parseInt(match.batting_score)
          if(runs>=100) {
            hundred+=1
          }
          else if(runs>=50 && runs<=100) {
            fifty+=1
          }
          totalRuns+=runs
        }
      }
    }
  })
  return [matches,fifty,hundred,totalRuns,catches]
}

function getCountryMatches(country, career_data) {
  let won=0
  let lost=0
  let tied=0
  
  career_data.map((match) => {
    if(match.opposition.substring(2,match.opposition.length)==country) {
      if(checkForDNB(match.batting_score)) {
        if(match.match_result=='won') {
          won+=1
        }
        else if(match.match_result=='lost') {
          lost+=1
        }
        else {
          tied+=1
        }
      }
    }
  })
  return [won,lost,tied] 
}

function getMatchesOverYears(career_data) {
  let scoreData = {}

  career_data.map((match) => {
    scoreData[`${match.date.slice(-4)}`] = []
  }) 

  career_data.map((match) => {
    scoreData[`${match.date.slice(-4)}`].push(1);
  })

  Object.keys(scoreData).map((year) => {
    let totalMatches = 0
    scoreData[`${year}`].map((matches) => {
      totalMatches+=matches
    })
    scoreData[`${year}`] = totalMatches
  })

  return [Object.keys(scoreData), Object.values(scoreData)]
}

function getRunsOverYears(career_data) {
  let scoreData = {}

  career_data.map((match) => {
    scoreData[`${match.date.slice(-4)}`] = []
  }) 

  career_data.map((match) => {
    if(checkForDNB(match.batting_score)) {
      if(match.batting_score.slice(-1)=='*') {
        scoreData[`${match.date.slice(-4)}`].push(parseInt(match.batting_score.slice(0,match.batting_score.length-1)))
      }
      else {
        scoreData[`${match.date.slice(-4)}`].push(parseInt(match.batting_score))
      }
    }
  })

  Object.keys(scoreData).map((year) => {
    let totalScore = 0
    scoreData[`${year}`].map((score) => {
      totalScore+=score
    })
    scoreData[`${year}`] = totalScore
  })

  return [Object.keys(scoreData), Object.values(scoreData)]
}

function getCatchesOverYears(career_data) {
  let scoreData = {}

  career_data.map((match) => {
    scoreData[`${match.date.slice(-4)}`] = []
  }) 

  career_data.map((match) => {
    if(match.catches !== '-') {
      scoreData[`${match.date.slice(-4)}`].push(parseInt(match.catches))
    }
  })

  Object.keys(scoreData).map((year) => {
    let totalCatches = 0
    scoreData[`${year}`].map((catches) => {
      totalCatches+=catches
    })
    scoreData[`${year}`] = totalCatches
  })

  return [Object.keys(scoreData), Object.values(scoreData)]
}

function getCenturiesOverYears(career_data) {
  let scoreData = {}

  career_data.map((match) => {
    scoreData[`${match.date.slice(-4)}`] = []
  }) 

  career_data.map((match) => {
    if(checkForDNB(match.batting_score)) {
      if(match.batting_score.slice(-1)=='*') {
        let runs=parseInt(match.batting_score.slice(0,match.batting_score.length-1))
        if(runs>=100) {
          scoreData[`${match.date.slice(-4)}`].push(1)
        }
      }
      else
      {
        let runs=parseInt(match.batting_score)
        if(runs>=100) {
          scoreData[`${match.date.slice(-4)}`].push(1)
        }
      }
    }
  })

  Object.keys(scoreData).map((year) => {
    let total = 0
    scoreData[`${year}`].map((score) => {
      total+=score
    })
    scoreData[`${year}`] = total
  })

  return [Object.keys(scoreData), Object.values(scoreData)]
}

function getHalfCenturiesOverYears(career_data) {
  let scoreData = {}

  career_data.map((match) => {
    scoreData[`${match.date.slice(-4)}`] = []
  }) 

  career_data.map((match) => {
    if(checkForDNB(match.batting_score)) {
      if(match.batting_score.slice(-1)=='*') {
        let runs=parseInt(match.batting_score.slice(0,match.batting_score.length-1))
        if(runs>=50 && runs<=100) {
          scoreData[`${match.date.slice(-4)}`].push(1)
        }
      }
      else
      {
        let runs=parseInt(match.batting_score)
        if(runs>=50 && runs<=100) {
          scoreData[`${match.date.slice(-4)}`].push(1)
        }
      }
    }
  })

  Object.keys(scoreData).map((year) => {
    let total = 0
    scoreData[`${year}`].map((score) => {
      total+=score
    })
    scoreData[`${year}`] = total
  })

  return [Object.keys(scoreData), Object.values(scoreData)]
}

function getAverageBattingScore(career_data) {
  let scoreData = {}

  career_data.map((match) => {
    scoreData[`${match.date.slice(-4)}`] = []
  }) 

  career_data.map((match)=>{
    if(checkForDNB(match.batting_score)) {
      if(match.batting_score.slice(-1)=='*') {
        scoreData[`${match.date.slice(-4)}`].push(parseInt(match.batting_score.slice(0,match.batting_score.length-1)))
      }
      else {
        scoreData[`${match.date.slice(-4)}`].push(parseInt(match.batting_score))
      } 
    }
  })

  Object.keys(scoreData).map((year)=>{
    let runTotal=0
    scoreData[`${year}`].map((run)=>{
      runTotal+=run
    })
    scoreData[`${year}`]=parseInt(runTotal/scoreData[`${year}`].length)
  })

  return [Object.keys(scoreData),Object.values(scoreData)]
}

function getTopGrounds(career_data)
{
  let grounds={}
  
  career_data.map((match)=>{
    if(checkForDNB(match.batting_score)) {
      grounds[`${match.ground.toUpperCase()}`]=0
    }
  })

  career_data.map((match)=>{
    if(checkForDNB(match.batting_score)) {
      if(checkForStar(match.batting_score)) {
        let runs=parseInt(match.batting_score.slice(0,match.batting_score.length-1))
        if(runs>=50) {
          grounds[`${match.ground.toUpperCase()}`]+=1
        }
      }
      else {
        let runs=parseInt(match.batting_score)
        if(runs>=50) {
          grounds[`${match.ground.toUpperCase()}`]+=1
        }
      }
    }
  })

  let bestGroundScores=[]
  let bestGroundLabels=[]
  Object.keys(grounds).map((ground)=>{
    if(grounds[`${ground}`]>=5) {
      bestGroundScores.push(grounds[`${ground}`])
      bestGroundLabels.push(ground)
    }
  })

  return [bestGroundScores,bestGroundLabels]
}

function getTopRivals(career_data)
{
  let rivals={}
   
  career_data.map((match)=>{
    if(checkForDNB(match.batting_score)) {
      rivals[`${match.opposition.slice(2,).toUpperCase()}`]=0
    }
  })

  career_data.map((match)=>{
    if(checkForDNB(match.batting_score)) {
      if(checkForStar(match.batting_score)) {
        let runs=parseInt(match.batting_score.slice(0,match.batting_score.length-1))
        if(runs>=50) {
          rivals[`${match.opposition.slice(2,).toUpperCase()}`]+=1
        }
      }
      else {
        let runs=parseInt(match.batting_score)
        if(runs>=50) {
          rivals[`${match.opposition.slice(2,).toUpperCase()}`]+=1
        }
      }
    }
  })

  let bestRivalScores=[]
  let bestRivalLabels=[]

  Object.keys(rivals).map((rival)=>{
    if(rivals[`${rival}`]>=5) {
      bestRivalScores.push(rivals[`${rival}`])
      bestRivalLabels.push(rival)
    }
  })

  return [bestRivalScores,bestRivalLabels]
}

export {getMatchesWon, getRuns, getCenturies, getCatches, getCountryStats, getCountryMatches
        , getMatchesOverYears, getRunsOverYears, getCatchesOverYears, getCenturiesOverYears
        , getHalfCenturiesOverYears, getAverageBattingScore, getTopGrounds, getTopRivals}