x = [2.02,2.17,3.51,5.16,5.39,8.48,9.81,11.57,11.57,14.48,16.12,17.56,17.59,20.54,20.71,22.08,23.9,26.53,26.68,30.28];
y = [10.98,4.98,9.02,10.94,5.06,1.93,9.02,5.06,1.89,10.95,9.02,5.06,10.95,10.94,1.65,9.02,1.67,5.39,9.03,1.67];
zz = [-72.25,-78.35,-70.9,-61.9,-77.37,-83.23,-62.6,-73.6,-72.5,-54.55,-53.95,-60.6,-45.85,-39.3,-63.85,-52.55,-69.5,-74.85,-58.9,-70.21];
z = [17.39,23.73,35.59,9.39,0.76,0.18,1.84,32.24,1.85,0.55,35.25,1.74,58.53,0.31,6.43,0.45,2.65,3.13,0.49,3.64];


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

title('Experiment with Interference of WiFi Traffic - Variance of RSSI Values')
xlabel('X-coordinate [m]')

ylabel('Y-coordinate [m]')