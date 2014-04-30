
x = [2.02,2.17,3.51,5.16,5.39,8.48,9.81,11.57,11.57,14.48,16.12,17.56,17.59,20.54,20.71,22.08,23.9,26.53,26.68,30.28];
y = [10.98,4.98,9.02,10.94,5.06,1.93,9.02,1.89,5.06,10.95,9.02,5.06,10.95,10.94,1.65,9.02,1.67,5.39,9.03,1.67];
zz = [-73.4,-80.92,-74.15,-65.25,0,0,-64.35,0,0,-51.3,-47.65,0,-46.65,-39.6,0,-48.58,0,0,-58.71,0];
z = [3.24,0.69,2.13,3.39,2.13,49.21,2.23,1.23,0.94,4.56,1.03];


% construct the interpolant function

F = TriScatteredInterp(x',y',z');

 

tx = 0:0.1:32; % sample uniformly the surface for matrices (qx, qy, qz)

ty = 0:0.1:15;

 

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

title('Experiment with Interference of Signal Generator - Variance of RSSI Values')
xlabel('X-coordinate [m]')

ylabel('Y-coordinate [m]')