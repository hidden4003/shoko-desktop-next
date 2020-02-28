export interface Api {
  user: string
  password: string
  key: string
  host: string
}

export interface Ui {
  groupFilter: boolean | number
  loginImage: string
}

enum RequestStatus {
    Pending = "Pending",
    Processing = "Processing",
    Timeout = "Timeout",
}

export interface QueueRequest {
  requestId: string
  name: string
  stamp: Date
  status: RequestStatus
}

export interface Notification {
  id: string
  status: string
  data: {
    type: string
    message: string
  }
}

export interface RootState {
  api: Api
  ui: Ui
  queue: {
    api: QueueRequest[],
    notifications: Notification[],
  }
}
