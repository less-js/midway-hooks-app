import { ElMessage, ElMessageBox } from 'element-plus'

// 成功提示信息
export function MessageSuccess(message: string, duration = 1500): void {
  ElMessage({
    message,
    type: 'success',
    duration,
    showClose: true,
    dangerouslyUseHTMLString: true,
  })
}

// 警告提示信息
export function MessageWarning(message: string, duration = 1500): void {
  ElMessage({
    message,
    type: 'warning',
    duration,
    showClose: true,
    dangerouslyUseHTMLString: true,
  })
}

// 错误提示信息
export function MessageError(message: string, duration = 1500): void {
  ElMessage({
    message,
    type: 'error',
    duration,
    showClose: true,
    dangerouslyUseHTMLString: true,
  })
}

// ⼀般信息提示信息
export function MessageInfo(message: string, duration = 1500): void {
  ElMessage({
    message,
    type: 'info',
    duration,
    showClose: true,
    dangerouslyUseHTMLString: true,
  })
}

// 确定⼀个确定按钮 ElMessageBox.alert
export function AlertBox(
  message: string,
  btnName?: string,
  type?: 'success' | 'info' | 'warning' | 'error'
) {
  const confirmName = btnName == '确定' ? '确定' : '是'
  return ElMessageBox.alert(message, '提示', {
    type: type,
    confirmButtonText: confirmName,
    dangerouslyUseHTMLString: true,
  })
}

// 确定取消; 是否按钮弹出框 ElMessageBox.confirm
export function ConfirmBox(
  message: string,
  btnName?: string,
  type?: 'success' | 'info' | 'warning' | 'error'
) {
  const confirmName = btnName == '确定' ? '确定' : '是'
  const cancelsName = btnName == '确定' ? '取消' : '否'
  return ElMessageBox.confirm(message, '提示', {
    type: type,
    confirmButtonText: confirmName,
    cancelButtonText: cancelsName,
    closeOnClickModal: false,
    closeOnPressEscape: false,
  })
}
