x = [2.02,2.17,3.51,5.16,5.39,8.48,9.81,11.57,11.57,14.48,16.12,17.56,17.59,20.54,20.71,22.08,23.9,26.53,26.68,30.28];
y = [10.98,4.98,9.02,10.94,5.06,1.93,9.02,5.06,1.89,10.95,9.02,5.06,10.95,10.94,1.65,9.02,1.67,5.39,9.03,1.67];
zz = [-65.07,-77.27,-64,-47.2,-75.93,-74.87,-50.87,-62.87,-64.6,-47.93,-51.73,-62.33,-39.33,-28.33,-58.6,-43.6,-66.53,-71.93,-60.47,-72.4];
z = [0.6,0.46,1.33,0.96,1.13,0.38,1.18,0.25,1.17,0.2,0.33,2.22,0.36,8.49,62.77,0.37,2.38,0.6,22.12,0.77];

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
%title('Experiment 01 - Mean of RSSI Values')
title('Experiment 01 - Variance of RSSI Values')
xlabel('X-coordinate [m]')
ylabel('Y-coordinate [m]')