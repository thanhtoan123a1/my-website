import React, { useState, useEffect } from 'react'

const useMultiAudio = urls => {
  const [sources] = useState(
    urls.map(url => {
      return {
        url,
        audio: new Audio(url),
      }
    }),
  )

  const [players, setPlayers] = useState(
    urls.map(url => {
      return {
        url,
        playing: false,
      }
    }),
  )

  const toggle = targetIndex => () => {
    const newPlayers = [...players]
    const currentIndex = players.findIndex(p => p.playing === true)
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false
      newPlayers[targetIndex].playing = true
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false
    } else {
      newPlayers[targetIndex].playing = true
    }
    setPlayers(newPlayers)
  }

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause()
    })
  }, [sources, players])

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener('ended', () => {
        const newPlayers = [...players]
        newPlayers[i].playing = false
        setPlayers(newPlayers)
      })
    })
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener('ended', () => {
          const newPlayers = [...players]
          newPlayers[i].playing = false
          setPlayers(newPlayers)
        })
      })
    }
  }, [])

  return [players, toggle]
}
// const changePlayStatus = urls => {
//   const abc = useMultiAudio(urls);
//   console.log();
//   let isPlaying = false;
//   let playIndex = 0;
//   for (let i = 0; i < players.length; i++) {
//     if (players[i].playing) {
//       isPlaying = true;
//       playIndex = i;
//     }
//   }
//   if (isPlaying) {
//     toggle(playIndex);
//   } else {
//     toggle(0)
//   }
// }

const MultiPlayer = ({ urls }) => {
  const [players, toggle] = useMultiAudio(urls)
  return <Player player={players[0]} toggle={toggle(0)} />
}

const Player = ({ player, toggle }) => {
  useEffect(() => {
    toggle();
  },[]);
  return (
    <div onClick={toggle}>
      <i className="now-ui-icons travel_info"></i>
    </div>
  )
}


export default MultiPlayer