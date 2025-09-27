import { Typography } from '@mui/material';
import { hexToRgba } from '../helper/common';
import React , { SVGProps }from 'react';
 
interface EditNoteIconProps extends SVGProps<SVGSVGElement> {
  iconColor?: string;
  width?: string;
  height?: string;
}
 
export const EditNoteIcon: React.FC<EditNoteIconProps> = ({
  iconColor = '',
  width,
  height,
}) => {
  return (
    <Typography variant="body1" sx={{ width: width ?? "48px", height: height ?? "48px" }}>
      <svg width="100%" height="100%" viewBox="0 0 48 48">
        <defs>
          <clipPath id="clip-path">
            <rect
              id="Rectangle_2888"
              data-name="Rectangle 2888"
              width="27.842"
              height="28"
              transform="translate(0 0)"
              fill={iconColor ?? '#0e2898'}
            />
          </clipPath>
        </defs>
        <g
          id="Group_2772"
          data-name="Group 2772"
          transform="translate(-1616 -136.5)"
        >
          <g id="Group_2334" data-name="Group 2334" transform="translate(23.5 -11)">
            <rect
              id="Rectangle_2918"
              data-name="Rectangle 2918"
              width="48"
              height="48"
              rx="4"
              transform="translate(1592.5 147.5)"
              fill={hexToRgba(iconColor, 0.19) ?? 'rgba(40,165,221,0.19)'}
            />
          </g>
          <g
            id="Group_2339"
            data-name="Group 2339"
            transform="translate(1627.5 147.211)"
            opacity="0.5"
          >
            <g
              id="Group_1516"
              data-name="Group 1516"
              transform="translate(0 0)"
              clip-path="url(#clip-path)"
            >
              <path
                id="Path_1713"
                data-name="Path 1713"
                d="M3.812.123C8.411.307,13.318-.2,17.883.1c6.195.4,3.71,8.663,4.215,12.66a1.109,1.109,0,0,1-2.156.416l-.02-8.678A2.275,2.275,0,0,0,17.8,2.271c-4.327-.374-9.189.286-13.572,0A2.226,2.226,0,0,0,2.175,4.488V23.631a2.23,2.23,0,0,0,1.97,2.119c2.249.26,4.941-.207,7.214.006a1.091,1.091,0,0,1,.307,2.14c-2.464-.076-5.183.231-7.62.04A4.412,4.412,0,0,1,0,23.806L.015,3.981A4.418,4.418,0,0,1,3.812.123"
                transform="translate(0 0)"
                fill={iconColor ?? '#0e2898'}
              />
              <path
                id="Path_1714"
                data-name="Path 1714"
                d="M31.514,26.455c-1.782,1.876-3.7,3.626-5.517,5.486L21.172,33.3c-.926-.034-1.276-.608-1.13-1.485a28.482,28.482,0,0,1,1.541-4.635c1.859-1.785,3.61-3.811,5.507-5.543a4.983,4.983,0,0,1,1.737-1.218,3.279,3.279,0,0,1,3.74,4.957,8.569,8.569,0,0,1-1.052,1.079m-1.88-4.012c-.171.035-.7.342-.666.534l1.5,1.441a1.093,1.093,0,0,0-.837-1.975M22.7,30.6l2.22-.606,3.953-3.961-1.52-1.52-4,4Z"
                transform="translate(-5.299 -5.363)"
                fill={iconColor ?? '#0e2898'}
              />
              <path
                id="Path_1715"
                data-name="Path 1715"
                d="M8.625,8.91,8.8,8.855l2.486-2.974a1.094,1.094,0,0,1,1.583,1.409c-.847.948-1.6,2.1-2.466,3.014-.97,1.03-1.868,1.32-3.048.348C6.672,10.086,5.507,9.038,6.112,8.1c.709-1.1,2.127,0,2.513.815"
                transform="translate(-1.574 -1.504)"
                fill={iconColor ?? '#0e2898'}
              />
              <path
                id="Path_1716"
                data-name="Path 1716"
                d="M6.408,18.753a2.012,2.012,0,0,1-.377-.449,1.089,1.089,0,0,1,1.458-1.458c.473.215.773.854,1.248,1.081.168-.029,1.867-2.277,2.186-2.6.246-.253.407-.482.782-.523a1.065,1.065,0,0,1,1.073,1.683A26.39,26.39,0,0,1,10.316,19.5c-1.512,1.587-2.785.643-3.908-.748"
                transform="translate(-1.569 -3.917)"
                fill={iconColor ?? '#0e2898'}
              />
              <path
                id="Path_1717"
                data-name="Path 1717"
                d="M11.816,23.7c1-.115,1.44,1.041.89,1.854a29.407,29.407,0,0,1-2.944,3.405,1.922,1.922,0,0,1-1.812.134A9.719,9.719,0,0,1,6.11,27.365a1.088,1.088,0,0,1,1.4-1.575c.276.135,1.054,1.145,1.229,1.107l2.408-2.9a2.059,2.059,0,0,1,.669-.295"
                transform="translate(-1.569 -6.274)"
                fill={iconColor ?? '#0e2898'}
              />
              <path
                id="Path_1718"
                data-name="Path 1718"
                d="M17.9,18.72a14.666,14.666,0,0,1,3.588.106,1.077,1.077,0,0,1,.169,1.912,11.187,11.187,0,0,1-3.522.224c-1.792-.154-1.8-2.017-.235-2.242"
                transform="translate(-4.438 -4.942)"
                fill={iconColor ?? '#0e2898'}
              />
              <path
                id="Path_1719"
                data-name="Path 1719"
                d="M21.906,11.5a1.771,1.771,0,0,1-.884.378,19.239,19.239,0,0,1-3.2-.024A1.088,1.088,0,0,1,17.635,9.7a27.1,27.1,0,0,1,3.8.012,1.129,1.129,0,0,1,.468,1.779"
                transform="translate(-4.448 -2.554)"
                fill={iconColor ?? '#0e2898'}
              />
            </g>
          </g>
        </g>
      </svg>
    </Typography>
  );
};
 
 