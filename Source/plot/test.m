x = [2.02,2.17,3.51,5.16,5.39,8.48,9.81,11.57,11.57,14.48,16.12,17.56,17.59,20.54,20.71,22.08,23.9,26.53,26.68,30.28];

y = [10.98,4.98,9.02,10.94,5.06,1.93,9.02,5.06,1.89,10.95,9.02,5.06,10.95,10.94,1.65,9.02,1.67,5.39,9.03,1.67];

mean = [-72.5,-79.55,-71,-67.85,-75.79,-79.55,-61.9,-75.32,-69.85,-50.85,-53.45,-57.3,-49.85,-38.6,-62.45,-46,-73.3,-74.05,-57.95,-69.05];

variance = [8.15,0.85,5,1.93,1.85,7.95,12.49,0.32,9.53,0.33,1.75,9.81,36.63,0.24,4.15,0.1,1.11,32.85,0.35,1.05];

 

z = mean;

 

% construct the interpolant function

F = TriScatteredInterp(x',y',z');

 

tx = 0:0.1:32; % sample uniformly the surface for matrices (qx, qy, qz)

ty = 0:0.1:15;
%
 

[qx, qy] = meshgrid(tx, ty); 

qz = F(qx, qy);

 

[C,h] = contourf(qx, qy, qz);

colormap(autumn)

%clabel(C,h);

colorbar

hold on; 

h = plot(x,y,'ko'); 

set(h, 'Markersize',10);

h = plot(21.5,14.8,'k.'); 

set(h, 'Markersize',30);

hold off

grid

xlabel('X-coordinate [m]')

ylabel('Y-coordinate [m]')