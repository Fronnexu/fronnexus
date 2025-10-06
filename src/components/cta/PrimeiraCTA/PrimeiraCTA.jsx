"use client';";
import CardSwap, { Card } from './CardSwap';

export default function PrimeiraCTA() {
  <div style={{ height: '600px' }}>
    <CardSwap
      cardDistance={60}
      verticalDistance={70}
      delay={5000}
      pauseOnHover={false}
    >
      <Card>
        <h3>Ericky</h3>
        <p>Your content here</p>
      </Card>
      <Card>
        <h3>Card 2</h3>
        <p>Your content here</p>
      </Card>
      <Card>
        <h3>Card 3</h3>
        <p>Your content here</p>
      </Card>
    </CardSwap>
  </div>;
}
