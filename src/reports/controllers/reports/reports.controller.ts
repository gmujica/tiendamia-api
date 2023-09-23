import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Orders } from 'src/orders/infrastructure/entity/orders.entity';
import { ReportsService } from 'src/reports/application/reports/reports.service';
import { DateRangeDto } from 'src/reports/infrastructure/dto/date-range.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // Report: Get orders in Traveling status within a date range
  @Get('/traveling')
  @ApiOperation({
    summary: 'Get orders in Traveling status within a date range',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the report.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiTags('Reports')
  async getTravelingOrdersReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<Orders[]> {
    const dateRangeDto: DateRangeDto = { startDate, endDate };
    const report = await this.reportsService.getTravelingOrdersReport(
      dateRangeDto,
    );
    return report;
  }
  // Get orders in "Approve" status with less than 2 days left for shipping promise
  @Get('/approve-orders-with-deadline')
  @ApiOperation({
    summary:
      'Get orders in Approve status with less than 2 days left for shipping promise',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the report.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiTags('Reports')
  async getApproveOrdersWithShippingPromiseDeadline(): Promise<Orders[]> {
    return await this.reportsService.getApproveOrdersWithShippingPromiseDeadline();
  }
}
