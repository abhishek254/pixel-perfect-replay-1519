import { queryOptions } from '@tanstack/react-query';
import { publicPortfolio, adminPortfolio } from './portfolio.functions';
export const portfolioQuery = queryOptions({ queryKey: ['portfolio-public'], queryFn: () => publicPortfolio(), staleTime: 60000 });
export const adminQuery = queryOptions({ queryKey: ['portfolio-admin'], queryFn: () => adminPortfolio() });