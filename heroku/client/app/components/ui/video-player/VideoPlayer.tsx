import { useRouter } from 'next/router'
import { FC, useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

import { AuthPlaceholder } from './auth-placeholder/AuthPlaceholder'
import { IVideoPlayer } from './video-player.types'
import { useAuth } from '@/hooks/useAuth'

export const VideoPlayer: FC<IVideoPlayer> = ({ videoSource, slug }) => {
  const { user } = useAuth()
  const { pathname } = useRouter()

  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const options = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoSource,
        type: 'video/mp4',
      },
    ],
  }

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current

      if (!videoElement) return

      const player = (playerRef.current = videojs(videoElement, options))
    } else {
    }
  }, [options, videoRef])

  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <>
      {user ? (
        <div data-vjs-player>
          <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
      ) : (
        <AuthPlaceholder slug={slug} />
      )}
    </>
  )
}
