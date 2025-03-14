import { Router } from 'express';
import { employerRouter } from './employer-routes.js';
import { employeeRouter } from './employee-routes.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

// Apply authenticateToken middleware to protect the routes
router.use('/:company_id', authenticateToken, (req, _res, next) => {
  const { company_id } = req.params;
  const employee_id = req.employee?.id;

  // Check if the employee logging in has access to employer routes
  if (req.employee && req.employee.access_level === true) {
    router.use(`/${company_id}`, employerRouter);
  }

  // Employee routes
  router.use(`/${company_id}/${employee_id}`, employeeRouter);

  next();
});

export default router;
