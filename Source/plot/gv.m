x = [2.02,2.17,3.51,5.16,5.39,8.48,9.81,11.57,11.57,14.48,16.12,17.56,17.59,20.54,20.71,22.08,23.9,26.53,26.68,30.28];
y = [10.98,4.98,9.02,10.94,5.06,1.93,9.02,5.06,1.89,10.95,9.02,5.06,10.95,10.94,1.65,9.02,1.67,5.39,9.03,1.67];

zsmall = [17.9, 13.82, 29.35, 46.52, 9.6, 12.1, 44.97, 30.37, 25.24, 3.97, 4.9, 9.35, 4.85, 136.62, 34.88, 11.96, 28.15, 21.89, 18.52, 11.17];
z = [12.78, 12.65, 20.3, 14.51, 1.93, 8.12, 7.29, 17.43, 7.44, 3.86, 18.56, 8.5, 51.58, 0.4, 5.78, 11, 5.49, 18.15, 0.64, 2.65];
zsig = [10.63, 10.91, 2.25, 1.63, 25.93, 8.31, 0.74, 16.19, 4.3, 1.94];


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

title('Experiment with Interference of WiFi Traffic - Group Variance')
xlabel('X-coordinate [m]')

ylabel('Y-coordinate [m]')