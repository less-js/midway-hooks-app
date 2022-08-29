import { Api, Get, useInject } from '@midwayjs/hooks'
import { InfoService } from '@midwayjs/info'
import { ctx } from '../../utils/common'

export const sysInfo = Api(Get('/system/system-info'), async () => {
  const infoService = await useInject(InfoService)
  // const projectInfo = infoService.projectInfo()
  // const systemInfo = infoService.systemInfo()
  // const resourceOccupationInfo = infoService.resourceOccupationInfo()
  // const softwareInfo = infoService.softwareInfo()
  // const midwayConfig = infoService.midwayConfig()
  // const midwayService = infoService.midwayService()
  // const timeInfo = infoService.timeInfo()
  // const envInfo = infoService.envInfo()
  // const dependenciesInfo = infoService.dependenciesInfo()
  // const networkInfo = infoService.networkInfo()
  const midwayInformationService = infoService.midwayInformationService

  ctx().ok({
    // projectInfo, // 应用信息，应用名等
    // systemInfo, // 系统信息
    // resourceOccupationInfo, // 堆内存，cpu 等
    // softwareInfo, // midway 框架的信息
    // midwayConfig, // 当前使用的环境配置
    // midwayService, // 依赖注入容器中的服务
    // timeInfo, // 系统时间，时区，启动时常
    // envInfo, // 环境变量
    // dependenciesInfo, // 依赖信息
    // networkInfo, // 网络信息
    midwayInformationService, // package.json 文件内的内容
  })
})
