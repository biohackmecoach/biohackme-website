// Daily.co service for video calling
// Note: Daily.co API key should be stored securely on the backend

export interface DailyRoom {
  url: string
  name: string
  created_at: string
  expires: string
  max_participants?: number
  privacy: 'public' | 'private'
  config?: {
    enable_screenshare?: boolean
    enable_recording?: boolean
    enable_chat?: boolean
    start_video_off?: boolean
    start_audio_off?: boolean
  }
}

export interface DailyMeetingToken {
  token: string
  room_name: string
  is_owner: boolean
  expires: number
}

class DailyService {
  private apiKey: string
  private baseUrl = 'https://api.daily.co/v1'

  constructor() {
    this.apiKey = import.meta.env.VITE_DAILY_API_KEY || ''
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'DELETE' = 'GET', body?: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      throw new Error(`Daily.co API error: ${response.statusText}`)
    }

    return response.json()
  }

  async createRoom(sessionId: string, config?: DailyRoom['config']): Promise<DailyRoom> {
    const roomData = {
      name: `biohackme-session-${sessionId}`,
      privacy: 'private' as const,
      properties: {
        max_participants: 2, // Coach + Client
        enable_screenshare: true,
        enable_recording: 'cloud', // For HIPAA compliance
        enable_chat: true,
        start_video_off: false,
        start_audio_off: false,
        exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60), // 2 hours
        eject_at_room_exp: true,
        ...config
      }
    }

    return this.makeRequest('/rooms', 'POST', roomData)
  }

  async getRoomInfo(roomName: string): Promise<DailyRoom> {
    return this.makeRequest(`/rooms/${roomName}`)
  }

  async deleteRoom(roomName: string): Promise<void> {
    await this.makeRequest(`/rooms/${roomName}`, 'DELETE')
  }

  async createMeetingToken(roomName: string, userId: string, isCoach: boolean = false): Promise<DailyMeetingToken> {
    const tokenData = {
      properties: {
        room_name: roomName,
        user_name: userId,
        is_owner: isCoach,
        exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60), // 2 hours
        enable_screenshare: true,
        enable_recording: isCoach, // Only coaches can start recording
      }
    }

    return this.makeRequest('/meeting-tokens', 'POST', tokenData)
  }

  async getRecordings(roomName: string) {
    return this.makeRequest(`/recordings?room_name=${roomName}`)
  }

  // Generate room URL for joining
  generateRoomUrl(roomName: string, token?: string): string {
    const baseUrl = `https://biohackme.daily.co/${roomName}`
    return token ? `${baseUrl}?t=${token}` : baseUrl
  }
}

export const dailyService = new DailyService()

// Daily.co React integration helpers
export const DAILY_CONFIG = {
  theme: {
    colors: {
      accent: '#022D4E', // BiohackMe Ocean color
      accentText: '#FFFFFF',
      background: '#F3F5F6', // BiohackMe Cloud color
      backgroundAccent: '#E9EFF2', // BiohackMe Ice color
      baseText: '#022D4E',
      border: '#5780AB', // BiohackMe Sky color
      mainAreaBg: '#F3F5F6',
      supportiveText: '#5780AB',
    },
  },
  userName: '',
  showLeaveButton: true,
  showFullscreenButton: true,
  showLocalVideo: true,
  showParticipantsBar: true,
  iframeStyle: {
    width: '100%',
    height: '500px',
    border: 'none',
    borderRadius: '8px',
  },
}

export default dailyService