const createBaseAlert = () => ({
  id: Date.now(),
  createdAt: new Date().toISOString(),
})

export const AlertType = {
  DANGER: 'danger',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
}

export const createDangerAlert = (message) => ({
  ...createBaseAlert(),
  type: AlertType.DANGER,
  message,
})

export const createSuccessAlert = (message) => ({
  ...createBaseAlert(),
  type: AlertType.SUCCESS,
  message,
})

export const createInfoAlert = (message) => ({
  ...createBaseAlert(),
  type: AlertType.INFO,
  message,
})

export const createWarningAlert = (message) => ({
  ...createBaseAlert(),
  type: AlertType.WARNING,
  message,
})
