# Graph Report - src\modules\dashboard-auth  (2026-08-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 66 nodes · 124 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `97df36c4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dashboard-auth.controller.ts
- DashboardAuthService
- .verify
- DashboardAccessDto
- index.ts
- .access
- .logout
- DashboardAuthController
- index.ts
- dashboard-auth.strategy.ts

## God Nodes (most connected - your core abstractions)
1. `DashboardAuthService` - 20 edges
2. `DashboardAuthController` - 9 edges
3. `DashboardAccessDto` - 9 edges
4. `DashboardAccessGuard` - 7 edges
5. `DashboardAccessResponseDto` - 5 edges
6. `DashboardVerifyResponseDto` - 5 edges
7. `DashboardLogoutResponseDto` - 5 edges
8. `DashboardTokenPayload` - 5 edges
9. `DASHBOARD_AUTH_CONSTANTS` - 4 edges
10. `DashboardAuthModule` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (10 total, 1 thin omitted)

### Community 0 - "dashboard-auth.controller.ts"
Cohesion: 0.25
Nodes (5): DASHBOARD_AUTH_CONSTANTS, DashboardAccessGuard, Injectable, DashboardAuthModule, Module

### Community 1 - "DashboardAuthService"
Cohesion: 0.24
Nodes (3): DashboardAuthService, Injectable, DashboardTokenPayload

### Community 2 - ".verify"
Cohesion: 0.33
Nodes (5): ApiCookieAuth, ApiOperation, ApiResponse, Get, UseGuards

### Community 3 - "DashboardAccessDto"
Cohesion: 0.33
Nodes (6): DashboardAccessDto, ApiProperty, IsNotEmpty, IsString, MaxLength, Transform

### Community 4 - "index.ts"
Cohesion: 0.67
Nodes (4): DashboardAccessResponseDto, DashboardLogoutResponseDto, DashboardVerifyResponseDto, ApiProperty

### Community 5 - ".access"
Cohesion: 0.40
Nodes (3): ApiBody, Body, Throttle

### Community 6 - ".logout"
Cohesion: 0.40
Nodes (3): HttpCode, Post, Res

### Community 7 - "DashboardAuthController"
Cohesion: 0.50
Nodes (3): ApiTags, Controller, DashboardAuthController

### Community 8 - "index.ts"
Cohesion: 0.50
Nodes (3): DashboardAccessResponse, DashboardLogoutResponse, DashboardVerifyResponse

## Knowledge Gaps
- **4 isolated node(s):** `DASHBOARD_AUTH_STRATEGY`, `DashboardAccessResponse`, `DashboardLogoutResponse`, `DashboardVerifyResponse`
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DashboardAuthService` connect `DashboardAuthService` to `dashboard-auth.controller.ts`, `.access`, `.logout`, `DashboardAuthController`?**
  _High betweenness centrality (0.288) - this node is a cross-community bridge._
- **Why does `DashboardAuthController` connect `DashboardAuthController` to `dashboard-auth.controller.ts`, `.verify`, `.access`, `.logout`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `DashboardAccessDto` connect `DashboardAccessDto` to `dashboard-auth.controller.ts`, `index.ts`, `.access`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **What connects `DASHBOARD_AUTH_STRATEGY`, `DashboardAccessResponse`, `DashboardLogoutResponse` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._